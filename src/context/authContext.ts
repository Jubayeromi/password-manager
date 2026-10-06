import { createContext } from "react";

export type User = {
    _id: string,
    gmail: string,
} | null;

type AuthContextValue = {
    user: User,
    loading: boolean,
    logIn: (email: string, password: string) => Promise<void>,
    signUp: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
};

export const authContext = createContext<AuthContextValue | undefined>(undefined);
