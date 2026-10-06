import Jwt  from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../lib/env.ts";

interface authRequest extends Request{
    userId:string
}

export const authMiddleware =(req:authRequest,res:Response, next:NextFunction)=>{

    const token= req.cookies?.token;

    if(!token){
        return res.status(401).send({data:"not authenticated"})
    }

    try{
const decoded = Jwt.verify(token, jwtSecret) as {userId:string}
req.userId = decoded.userId
next()
    }catch(err){
        console.error(err,"something went wrong")
        res.status(401).send({data:"invalide or expaired token"})
    }
}