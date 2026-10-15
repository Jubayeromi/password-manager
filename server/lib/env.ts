import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const jwtSecret = process.env.JWT_SECRET;
const configuredEncryptionKey = process.env.ENCRYPTION_KEY;
const configuredMongoUri = process.env.MONGODB_URI;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing from server/.env");
}

if (!configuredEncryptionKey) {
    throw new Error("ENCRYPTION_KEY is missing from server/.env");
}

if (!configuredMongoUri) {
    throw new Error("MONGODB_URI is missing from server/.env");
}

const encryptionKey: string = configuredEncryptionKey;
const mongoUri: string = configuredMongoUri;

export { encryptionKey, jwtSecret, mongoUri };
