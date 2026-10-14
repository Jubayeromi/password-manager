import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const jwtSecret = process.env.JWT_SECRET;
const configuredEncryptionKey = process.env.ENCRYPTION_KEY;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing from server/.env");
}

if (!configuredEncryptionKey) {
    throw new Error("ENCRYPTION_KEY is missing from server/.env");
}

const encryptionKey: string = configuredEncryptionKey;

export { encryptionKey, jwtSecret };
