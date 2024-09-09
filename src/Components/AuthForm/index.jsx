import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {
    getAuthError,
    getAuthStatus,
    getUserToken, fetchUserData
} from '../../Redux/reducer/slice'

function AuthForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const localStorageEmail = localStorage.getItem('email')
    const localStoragePassword = localStorage.getItem('password')
    const [credentials, setCredentials] = useState({
        email: localStorageEmail || '',
        password: localStoragePassword || '',
    })
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
        contentError = 'Loading';
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

        // Attendre la résolution de l'action getUserToken
        const token = await dispatch(getUserToken(credentials));

        // Récupérer le token après que l'état ait été mis à jour
        if (token) {
            // Récupérer les données utilisateur et rediriger vers le profil
            await dispatch(fetchUserData(token?.payload?.body?.token));
            navigate('/profile');
        } else {
            console.error('Authentication failed: Token not available');
        }
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
                <label htmlFor="username">Email</label>
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

export default AuthForm