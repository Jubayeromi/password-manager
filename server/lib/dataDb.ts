import mongoose from "mongoose";
import { dbConnect } from "./database.ts";

export { dbConnect };

const loginSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    site:{type:String, required:true },
    userName:{type:String, required:true},
    password:{type:String, required:true}
})

export const userData = mongoose.models.data || mongoose.model("data", loginSchema)