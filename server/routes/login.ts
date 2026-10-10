import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Router } from 'express';
import { dbConnect, user } from '../lib/signUp.ts';
import { jwtSecret } from '../lib/env.ts';

const loginAUth = Router()

loginAUth.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = typeof email === "string" ? email.trim() : "";

        if (
            !normalizedEmail.toLowerCase().endsWith("@gmail.com") ||
            typeof password !== "string" ||
            password.trim().length < 8
        ) {
            return res.status(400).send({ data: "Please enter a valid Gmail address and password." });
        }

        await dbConnect();

        const mailCheck = await user.findOne({ gmail: normalizedEmail }).collation({ locale: "en", strength: 2 });

        if (!mailCheck) {
            return res.status(401).send({ data: "Invalid Credentials." })
        }
        const hashedPassword = await brcypt.compare(password, mailCheck.password)

        if (hashedPassword) {
            const token = jwt.sign(
                { userId: mailCheck._id },
                jwtSecret,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return res.status(201).send({ data: "you're logged in" })
        }

        return res.status(401).send({ data: "Invalid Credentials." })
    } catch (err) {
        console.error(err, "something went wrong here")
        return res.status(500).send({ data: "something went wrong" })
    }
})

loginAUth.post("/logout", (_req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    })
    return res.status(200).json({ data: "you're logged out" })
})

export default loginAUth;
