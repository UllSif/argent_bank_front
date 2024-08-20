// Quand on se connecte, le header doit changer (etat modifié par redux)
// On est redirigé vers la page profile
// Le bouton remember me doit stocker le token dans le local storage

import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {
    changeUserCredentials,
    getAuthError,
    getAuthStatus,
    getUserToken,
} from './authSlice'

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const localStorageToken = localStorage.getItem('token');
    const localStorageEmail = localStorage.getItem('email')
    const localStoragePassword = localStorage.getItem('password')
    const [credentials, setCredentials] = useState({
        email: localStorageEmail || '',
        password: localStoragePassword || '',
    })
    // const [token, setToken] = useState(localStorageToken || '');
    const [rememberMe, setRememberMe] = useState(true);

    const authError = useSelector(getAuthError);
    const authStatus = useSelector(getAuthStatus);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    let contentError = "";
    if (authStatus === 'failed') {
        contentError = <span className="errorMessage">{authError}</span>
    } else if (authStatus === 'loading') {
        contentError = 'ok';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rememberMe) {
            localStorage.setItem('email', credentials.email)
            localStorage.setItem('password', credentials.password)
        } else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }
        await dispatch(changeUserCredentials(credentials))
        await dispatch(getUserToken(credentials))
        navigate('/profile')
    }

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="email"
                    autoFocus
                    value={credentials.email}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            {contentError}
        </form>
    )
}

export default LoginForm