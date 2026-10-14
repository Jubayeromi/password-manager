import type { Dispatch, SetStateAction } from "react";

export type Login = {
  email: string;
  password: string;
};

type LoginState = [login: Login, setLogin: Dispatch<SetStateAction<Login>>];

export const loginAuth = async ([login,setLogin]: LoginState,setshowLogin:Dispatch<SetStateAction<boolean>>) => {
    try{
    if(login.email.trim().endsWith("@gmail.com") && login.password.trim().length >= 8){
      const LOGIN =import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
       const api= await fetch(`${LOGIN}/login`, {
            method: "POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        });
         const response = await api.json()
  console.log(response)
  if(api.status === 201){
    setshowLogin(false)
    setLogin({ email: "", password: "" })
   
  }
        
    }else{
  alert("pls write a valid email and password.")
}

  }catch(err){
    console.error(err,"someting in the front end at authLogin")
  }
};