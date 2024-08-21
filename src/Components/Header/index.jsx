import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.png"
import {useSelector, useDispatch} from "react-redux";
import {getUserData, emptyUserData} from "../UserForm/userSlice";
import {getAuthConnected, logout} from "../AuthForm/authSlice";

function Header() {
    const dispatch = useDispatch()
    const firstName = useSelector(getUserData).firstName
    const connected = useSelector(getAuthConnected)

    const handleLogOut = () => {
        dispatch(logout())
        dispatch(emptyUserData())
    }

    return (
        <header className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={logo} alt="Logo Argent Bank" className="main-nav-logo-image" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <nav className="nav">
                {/*Quand on est connecté, la nav doit changer, avec un logout puis redirige vers l'accueil*/}
                {!connected &&(
                <NavLink className="main-nav-item" to="/sign-in">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </NavLink>
                )}
                {connected && (
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {firstName}
                        </NavLink>
                        <NavLink className="main-nav-item" to="/" onClick={handleLogOut}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>Sign out
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header