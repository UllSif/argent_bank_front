import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getAuthConnected, getUserData} from "../../Redux/reducer/slice";
import UserEditForm from "../../Components/UserForm";
import BankAccount from "../../Components/BankAccount";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const [editToggle, setEditToggle] = useState(false)
    const user = useSelector(getUserData)
    const connected = useSelector(getAuthConnected);

    useEffect(() => {
        if (!connected) {
            navigate('/sign-in');
        }
    }, [connected, navigate]);

    const handleClick = (e) => {
        e.preventDefault()
        setEditToggle(!editToggle)
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br/>
                    {user.userName}
                </h1>
                {editToggle ? (
                    <UserEditForm
                        editToggle={editToggle}
                        setEditToggle={setEditToggle}
                    />
                ) : (
                    <button
                        className="edit-button"
                        onClick={(e) => handleClick(e)}
                    >
                        Edit Name
                    </button>
                )}
            </div>
            <BankAccount/>
        </main>
    )
}

export default Profile