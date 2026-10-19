import { Router } from "express";
import mongoose from "mongoose";
import { dbConnect, userData } from "../lib/dataDb.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import { encryptText, decryptText } from "../lib/encryption.ts";



const saveRouter = Router()

const isEncryptedPassword = (
  value: unknown,
): value is { iv: string; encrypted: string; tag: string } =>
  typeof value === "object" &&
  value !== null &&
  "iv" in value &&
  typeof value.iv === "string" &&
  "encrypted" in value &&
  typeof value.encrypted === "string" &&
  "tag" in value &&
  typeof value.tag === "string";

const isStoredEncryptedPassword = (password: string) => {
  try {
    return isEncryptedPassword(JSON.parse(password));
  } catch (err) {
    if (err instanceof SyntaxError) return false;
    throw err;
  }
};

saveRouter.post("/save", authMiddleware, async (req, res) => {
  const { site, userName, password } = req.body;

  if (
    typeof site !== "string" ||
    typeof userName !== "string" ||
    typeof password !== "string" ||
    !site.trim() ||
    !userName.trim() ||
    !password.trim()
  ) {
    return res.status(400).json({ data: "Please provide a site, username, and password." });
  }

  try {
    await dbConnect();
    const encrypted = encryptText(password);
    await userData.create({
      user: req.userId,
      site: site.trim(),
      userName: userName.trim(),
      password: JSON.stringify(encrypted),
    });

    return res.status(201).json({ data: "data submitted" });
  } catch (err) {
    console.error(err, "Could not save password");
    return res.status(500).json({ data: "Could not save password" });
  }
})


saveRouter.get("/saved", authMiddleware, async (req, res) => {
  try {
    await dbConnect();
    const entries = await userData.find({ user: req.userId });
    const oldEntries = entries.filter(
      (entry) => !isStoredEncryptedPassword(entry.password),
    );

    if (oldEntries.length > 0) {
      await userData.bulkWrite(
        oldEntries.map((entry) => ({
          updateOne: {
            filter: { _id: entry._id, user: req.userId },
            update: { $set: { password: JSON.stringify(encryptText(entry.password)) } },
          },
        })),
      );
    }

    return res.status(200).json({
      data: entries.map(({ _id, site, userName }) => ({ _id, site, userName })),
    });
  } catch (err) {
    console.error(err, "Could not load saved passwords");
    return res.status(500).json({ data: "Could not load saved passwords" });
  }
});


saveRouter.post("/saved/:id/show-password", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await dbConnect();

    const entry = await userData.findOne({
      _id: id,
      user: req.userId,
    });

    if (!entry) {
      return res.status(404).json({ data: "Password not found" });
    }

    let encryptedData: unknown;
    try {
      encryptedData = JSON.parse(entry.password);
    } catch (err) {
      if (!(err instanceof SyntaxError)) throw err;
      // Passwords saved before encryption are returned only when explicitly revealed.
      return res.status(200).json({ data: { password: entry.password } });
    }

    const plainPassword = isEncryptedPassword(encryptedData)
      ? decryptText(encryptedData)
      : entry.password;

    return res.status(200).json({ data: { password: plainPassword } });
  } catch (err) {
    console.error(err, "Failed to reveal password");
    return res.status(500).json({ data: "Could not reveal password" });
  }
});

saveRouter.delete("/saved/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ data: "Invalid password ID" });
    }

    await dbConnect();
    const deletedEntry = await userData.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedEntry) {
      return res.status(404).json({ data: "Password not found" });
    }

    return res.status(200).json({ data: "Password deleted" });
  } catch (err) {
    console.error(err, "Could not delete password");
    return res.status(500).json({ data: "Could not delete password" });
  }
});

export default saveRouter;
