import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Router } from 'express';
import { dbConnect, user } from '../lib/signUp.ts';

const loginAUth = Router()

loginAUth.post("/login", async (req,res)=>{
try{
const {email, password}= req.body;

 if(email.trim().endsWith("@gmail.com") && password.trim().length >= 8){
    await dbConnect();

    const mailCheck = await user.findOne({gmail:email })
    
    if(!mailCheck){
        return res.status(401).send({data:"Invalid Credentials"})
    } 
    const hashedPassword = await brcypt.compare(password, mailCheck.password)

    if(hashedPassword){
        res.status(201).send({data:"you're logged in"})
    } else{
       return res.status(401).send({data:"wrong password try again."})
    }
 }

} catch(err){
    console.error(err, "something went wrong here")
    res.status(400).send({data:"something went wrong"})
}
})

export default loginAUth;
