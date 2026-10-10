import Jwt  from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../lib/env.ts";

declare module "express-serve-static-core" {
    interface Request {
        userId: string;
    }
}

const hasUserId = (value: unknown): value is { userId: string } =>
    typeof value === "object" &&
    value !== null &&
    "userId" in value &&
    typeof value.userId === "string";

export const authMiddleware =(req:Request,res:Response, next:NextFunction)=>{

    const token= req.cookies?.token;

    if(!token){
        return res.status(401).send({data:"not authenticated"})
    }

    try{
const decoded: unknown = Jwt.verify(token, jwtSecret)
if (!hasUserId(decoded)) {
    return res.status(401).send({data:"invalide or expaired token"})
}
req.userId = decoded.userId
next()
    }catch(err){
        console.error(err,"something went wrong")
        res.status(401).send({data:"invalide or expaired token"})
    }
}