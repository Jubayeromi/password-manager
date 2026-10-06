import express from 'express';
import loginRouter from './routes/signUp.ts';
import cors from 'cors'
import loginAUth from './routes/login.ts';
import cookieParser from "cookie-parser";
import meAuth from './routes/me.ts';




const app=express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())

// type obj ={
//     email:{type:String, required:true},
//     password:{type:String,required:true}
// }


app.use(loginRouter)

app.use(loginAUth)
app.use(meAuth)

const port = 3000;

app.listen(port, ()=>{
    console.log(`server running on Address http://localhost:${port}`)
});