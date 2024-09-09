import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.webp"
import {useSelector, useDispatch} from "react-redux";
import {emptyUserData, getAuthConnected, logout, getUserData} from "../../Redux/reducer/slice";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle, faSignOut} from '@fortawesome/free-solid-svg-icons';

function Header() {
    const dispatch = useDispatch();

// Récupère les données utilisateur via un sélecteur
    const user = useSelector(getUserData);

// Vérifie si l'utilisateur est connecté
    const connected = useSelector(getAuthConnected);

    // Fonction de déconnexion
    const handleLogOut = () => {
        dispatch(logout());
        dispatch(emptyUserData());
    }

    return (
        <header className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={logo} alt="Logo Argent Bank" className="main-nav-logo-image"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <nav className="nav">
                {!connected && (
                    <NavLink className="main-nav-item" to="/sign-in">
                        <FontAwesomeIcon icon={faUserCircle}/>  Sign In
                    </NavLink>
                )}
                {connected && (
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <FontAwesomeIcon icon={faUserCircle}/> {user.userName}
                        </NavLink>
                        <NavLink className="main-nav-item" to="/" onClick={handleLogOut}>
                            <FontAwesomeIcon icon={faSignOut}/>  Sign out
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header