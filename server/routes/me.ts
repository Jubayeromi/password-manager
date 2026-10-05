import { Router,Request,Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {user} from '../lib/signUp.ts'


const meAuth = Router()

interface AuthRequest extends Request {
    userId?: string;
}

meAuth.get("/me",authMiddleware,async (req:AuthRequest,res:Response)=>{
try{
const foundUser= await user.findById(req.userId).select("-password")

        if (!foundUser) {
            return res.status(404).json({ data: "user not found" });
        }
           res.status(200).json({ data: foundUser });
}catch(err){
    console.error(err,"something went wrong")
    
}
})

export default meAuth