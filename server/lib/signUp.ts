import mongoose from "mongoose";

const connect = 'mongodb://localhost:27017/manager'

export const dbConnect=async()=>{
if(mongoose.connection.readyState >=1)return;
await mongoose.connect(connect)
}

const loginSchema = new mongoose.Schema({
    gmail:{type:String, required:true },
    password:{type:String, required:true}
})

export const user = mongoose.models.user || mongoose.model("user", loginSchema)