
import { Router, type Request, type Response } from "express";
import { dbConnect, user } from '../lib/signUp.ts'
import bcrypt from 'bcrypt'
type LoginBody = {
    email:string,
    password:string
}

const loginRouter = Router()

loginRouter.post("/signup",async (req: Request<{}, { data: string }, LoginBody>, res: Response<{ data: string }>) => {

    try{

        const { email, password } = req.body;
        console.log( email, password)
        if(email.trim().endsWith("@gmail.com") && password.trim().length >= 8){
            await dbConnect();

            if(await user.findOne({ gmail: email }) !== null){

               return res.status(409).send({data:"this gmail is taken"})
            } else{
                const hashedPassword = await bcrypt.hash(password,10)
                await user.create({ gmail: email, password:hashedPassword })
                res.status(201).json({ data: "recieved the data" })
            }
          
            
        } else{
            res.status(400).send({data:"something went wrong"})
        }
    } catch (err){
        console.error(err,"found problem during getting and setting the data")
        res.status(500).json({ data: "signup failed" })
    }

})

export default loginRouter;