import {useLocation, useNavigate} from "react-router";
import {useAuth} from "../hook/useAuth";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {singIn} = useAuth();
    const fromPage = location.state?.state?.pathname || '/'

    const handleSignin = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value

        singIn({email, password}, navigate(`${fromPage}`, {replace: true}))
    }

    return (
        <>
            <div className="p-8 min-w-3/4 w-96">
                <h1 className="text-2xl">Login page</h1>
                <form onSubmit={handleSignin} className="mt-6 ">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row">
                            <label className="min-w-24 ">Username:</label>
                            <input className="flex-1" type="text" name="email"/>
                        </div>
                        <div className="flex flex-row">
                            <label className="min-w-24 ">Password:</label>
                            <input className="flex-1" type="password" name="password"/>
                        </div>
                        <div className="flex flex-row-reverse mt-4">
                            <button type="submit" className="border rounded px-2.5 py-1 w-32">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginPage;