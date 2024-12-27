import {createContext, ReactNode, useState} from 'react';

export const AuthContext = createContext(null)

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({children}:AuthProviderProps) => {
    const [user, setUser] = useState(null);

    const singIn = (newUser, cb) => {
        setUser(newUser);
        cb()
    }

    const signOut = (cb) => {
        setUser(null);
        cb()
    }

    const value = {user, singIn, signOut};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;