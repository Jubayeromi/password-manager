import { error } from "console";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";


type User ={
    _id:string,
    email:string,

} | null;


type authType ={
    user:User,
    loading:boolean,
    login:(email:string,password:string) => Promise<void>,
    logout:Promise<void>
}

const authContext = createContext<authType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fun =async()=>{

            const api =await fetch("http://localhost:3000/me", {
                credentials:"include"
            })
            const response = await api.json()
            if(!response.ok){
                throw new error("not logged in try again")   
            }
             setUser(response.data)

        }
    fun();
     
    }, [])
    
}