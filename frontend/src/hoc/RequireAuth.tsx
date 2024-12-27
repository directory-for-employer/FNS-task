import {Navigate, useLocation} from "react-router";
import {ReactNode} from "react";
import {useAuth} from "../hook/useAuth";


interface RequireAuthProps {
    children?: ReactNode;
}

const RequireAuth = ({children}: RequireAuthProps) => {
    const location = useLocation()
    const {user} = useAuth()

    if(!user) {
        return <Navigate to='/login' state={{state: location }}/>
    }


    return children
};

export default RequireAuth;