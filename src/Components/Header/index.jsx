import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.png"

function Header() {
    return (
        <header className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={logo} alt="Logo Argent Bank" className="main-nav-logo-image" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <nav className="nav">
                <NavLink className="main-nav-item" to="/">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </NavLink>
            </nav>
        </header>
    )
}

export default Header