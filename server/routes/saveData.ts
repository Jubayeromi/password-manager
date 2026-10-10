import { Router } from "express";
import { dbConnect, userData } from "../lib/dataDb.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";



const saveRouter = Router()

saveRouter.post("/save", authMiddleware ,async (req,res)=>{

    const {site,userName,password} = req.body;
    try{
    if(site.trim() && userName.trim() && password.trim()){
       await dbConnect();
      await userData.create({
        user: req.userId,
        site,userName,password
    })
return res.status(201).json({data:"data submitted"})
    } else{
       return res.status(401).send({data:"please give site , username and password"})
    }
    } catch(err){
        console.error(err,"something went wrong")
    }
})


saveRouter.get("/saved", authMiddleware, async (req, res) => {
  await dbConnect();

  const entries = await userData.find({ user: req.userId });
  return res.status(200).json({ data: entries});
});

export default saveRouter;
