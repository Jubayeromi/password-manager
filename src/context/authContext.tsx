
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";


type User = {
    _id: string,
    email: string,

} | null;


type authType = {
    user: User,
    loading: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
}

const authContext = createContext<authType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkedLoggedIn = async () => {
            try {

                const api = await fetch("http://localhost:3000/me", {
                    credentials: "include"
                })
                const response = await api.json()
                if (!api.ok) {
                    throw new Error("not logged in try again")
                }
                setUser(response.data)
            } catch (err) {
                console.error(err, "something went wrong")
                setUser(null)
            } finally {
                setLoading(true)
            }

        }
        checkedLoggedIn();

    }, [])

        const logIn = async (email: string, password: string) => {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
          if (!res.ok) {
            throw new Error("login failed");
        }

           const meRes = await fetch("http://localhost:3000/me", { credentials: "include" });
        const meData = await meRes.json();
        setUser(meData.data);
    };


        const logout = async () => {
        await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

       return (
        <authContext.Provider value={{ user, loading, logIn, logout }}>
            {children}
        </authContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}