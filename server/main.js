import express from 'express';
import loginRouter from './routes/signUp.ts';
import cors from 'cors'
import loginAUth from './routes/login.ts';




const app=express();
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())

// type obj ={
//     email:{type:String, required:true},
//     password:{type:String,required:true}
// }


app.use(loginRouter)

app.use(loginAUth)

const port = 3000;

app.listen(port, ()=>{
    console.log(`server running on Address http://localhost:${port}`)
});