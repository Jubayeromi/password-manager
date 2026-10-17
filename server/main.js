import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import loginRouter from './routes/signUp.ts';
import cors from 'cors'
import loginAUth from './routes/login.ts';
import cookieParser from "cookie-parser";
import meAuth from './routes/me.ts';
import saveRouter from './routes/saveData.ts'




const app=express();
app.use(cookieParser());
app.use(cors({ origin: process.env.VITE_FRONTEND_URL || "http://localhost:5173", credentials: true }))
app.use(express.json())



app.use(loginRouter)

app.use(loginAUth)
app.use(meAuth)
app.use(saveRouter)

const clientDistPath = fileURLToPath(new URL("../dist/", import.meta.url));
app.use(express.static(clientDistPath));
app.get(/.*/, (req, res, next) => {
  if (!req.accepts("html")) return next();
  return res.sendFile(path.join(clientDistPath, "index.html"));
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, ()=>{
    console.log(`server running on Address http://localhost:${port}`)
});