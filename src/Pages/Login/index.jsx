import AuthForm from "../../Components/AuthForm";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

function Login () {
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" size="2x"/>
                <h1>Sign In</h1>
                <AuthForm />
            </section>
        </main>
    );
}

export default Login