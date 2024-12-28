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
            <h1>Login page </h1>
            <form onSubmit={handleSignin}>
                <label>
                    Email: <input name='email' type="email"/>
                </label>
                <label>
                    Password: <input name='password' type="password"/>
                </label>
                <button type="submit"> Отправить </button>
            </form>
        </>
    );
};

export default LoginPage;