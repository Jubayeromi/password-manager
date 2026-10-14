import crypto from "node:crypto";
import { encryptionKey } from "./env.ts";

const algorithm = "aes-256-gcm";
const key = crypto.createHash("sha256").update(encryptionKey).digest();

export function encryptText(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    encrypted: encrypted.toString("hex"),
    tag: tag.toString("hex"),
  };
}

export function decryptText(payload: {
  iv: string;
  encrypted: string;
  tag: string;
}) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(payload.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(payload.tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.encrypted, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}