import {useContext} from "react";
import {AuthContext} from "../hoc/AuthProvider";


export const useAuth = () => {
    const context = useContext(AuthContext);

    if(context === undefined) {
        throw new Error('useAuth must be used within the AuthProvider');
    }
    
    return context;
}