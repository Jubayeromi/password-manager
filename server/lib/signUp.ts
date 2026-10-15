import mongoose from "mongoose";
import { dbConnect } from "./database.ts";

export { dbConnect };

const loginSchema = new mongoose.Schema({
    gmail:{type:String, required:true },
    password:{type:String, required:true}
})

export const user = mongoose.models.user || mongoose.model("user", loginSchema)