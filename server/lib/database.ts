import mongoose from "mongoose";
import { mongoUri } from "./env.ts";

export const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoUri);
};
