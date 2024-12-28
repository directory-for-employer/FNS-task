import {createContext, PropsWithChildren, useState} from 'react';
import {Navigation} from "react-router";
import backendURL from '../../backendURL'

export const AuthContext = createContext(null)

type AuthProviderProps = PropsWithChildren

type User = {
    email: string,
    password: string,
}

const AuthProvider = ({children}:AuthProviderProps) => {
    const [user, setUser] = useState<User | null>();


    const singIn = async (newUser: User, cb: Navigation) => {
        let response = await fetch(`${backendURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"email":newUser.email, "password": newUser.password})
        });
        let result = await response.json();
        setUser(result.user)
        cb()
    }

    const signOut = (cb: Navigation) => {
        setUser(null);
        cb()
    }

    const value = {user, singIn, signOut};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;