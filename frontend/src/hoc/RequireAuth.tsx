import {Navigate, useLocation, useNavigate} from "react-router";
import {PropsWithChildren} from "react";
import {useAuth} from "../hook/useAuth";

type ProtectedRouteProps = PropsWithChildren;

const RequireAuth = ({children}: ProtectedRouteProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useAuth()
    console.log(user);

    if(!user){
        return <Navigate to='/login' state={{from: location}}/>
    }

    // useEffect(() => {
    //     if(user === null) {
    //         navigate("/login", { replace: true });
    //     }
    // }, [navigate, user])

    return children
};

export default RequireAuth;