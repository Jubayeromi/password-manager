import { Router } from "express";
import { dbConnect, userData } from "../lib/dataDb.ts";



const saveRouter = Router()

saveRouter.post("/save",async (req,res)=>{

    const {site,userName,password} = req.body;
    try{
    if(site.trim() && userName.trim() && password.trim()){
       await dbConnect();
       await userData.create({site,userName,password})

    } else{
       return res.status(401).send({data:"please give site , username and password"})
    }
    } catch(err){
        console.error(err,"something went wrong")
    }
})

export default saveRouter;


