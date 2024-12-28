import {Navigate, useLocation} from "react-router";
import {PropsWithChildren} from "react";
import {useAuth} from "../hook/useAuth";

type ProtectedRouteProps = PropsWithChildren;

const RequireAuth = ({children}: ProtectedRouteProps) => {
    const location = useLocation();
    const {user} = useAuth()
    if(!user){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children
};

export default RequireAuth;