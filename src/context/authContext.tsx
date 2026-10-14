
import { useState, useEffect, type ReactNode } from "react";
import { authContext, type User } from "./authContext";


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const checkedLoggedIn = async () => {
            try {
                const URL= import.meta.env.BACKEND_URL ||"http://localhost:3000"
                const api = await fetch(`${URL}/me`, {
                    credentials: "include"
                })
                if (api.status === 401) {
                    setUser(null)
                    return
                }

                if (!api.ok) throw new Error(`Could not check login status (${api.status})`)

                const response = await api.json()
                setUser(response.data)
            } catch (err) {
                console.error("Could not check login status:", err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkedLoggedIn();
    }, [])

    const logIn = async (email: string, password: string) => {
        const API = import.meta.env.BACKEND_URL || "http://localhost:3000"
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        const response = await res.json()
        if (!res.ok) {
            throw new Error(response.data ?? `Login failed (${res.status})`)
        }
        const API_URL =import.meta.env.BACKEND_URL || "http://localhost:3000"
        const meRes = await fetch(`${API_URL}/me`, { credentials: "include" });
        if (!meRes.ok) throw new Error(`Could not load the signed-in user (${meRes.status})`)
        const meData = await meRes.json();
        setUser(meData.data);
    };

    const signUp = async (email: string, password: string) => {
        const SIGNUP= import.meta.env.BACKEND_URL || "http://localhost:3000"
        const res = await fetch(`${SIGNUP}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error(`Sign up failed (${res.status})`)

        await logIn(email, password)
    };

    const logout = async () => {
        const LOGOUT = import.meta.env.BACKEND_URL || "http://localhost:3000"
        const res = await fetch(`${LOGOUT}/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (!res.ok) throw new Error(`Logout failed (${res.status})`)
        setUser(null);
    };

    return (
        <authContext.Provider value={{ user, loading, logIn, signUp, logout }}>
            {children}
        </authContext.Provider>
    );

}