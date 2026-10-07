import mongoose from "mongoose";

const connect = 'mongodb://localhost:27017/userData'

export const dbConnect=async()=>{
if(mongoose.connection.readyState >=1)return;
await mongoose.connect(connect)
}

const loginSchema = new mongoose.Schema({
    site:{type:String, required:true },
    userName:{type:String, required:true},
    password:{type:String, required:true}
})

export const userData = mongoose.models.data || mongoose.model("data", loginSchema)