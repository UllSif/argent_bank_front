import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAuthToken } from "../../Components/LoginForm/authSlice";
import {fetchUserData, getUserData} from "../../Components/ProfileForm/profileSlice";
import UserEditForm from "../../Components/ProfileForm";
import BankAccount from "../../Components/BankAccount";

function Profile() {
    const dispatch = useDispatch();
    const [editToggle, setEditToggle] = useState(false)
    const token = useSelector(getAuthToken)
    const user = useSelector(getUserData)

    useEffect(() => {
        dispatch(fetchUserData(token))
    }, [dispatch, token])

    const handleClick = (e) => {
        e.preventDefault()
        setEditToggle(!editToggle)
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user.firstName} {user.lastName}
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
            <BankAccount />
        </main>
    )
}

export default Profile