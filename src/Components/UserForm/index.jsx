import {useDispatch, useSelector} from 'react-redux'

import {getUserData, getAuthToken, updateUserData} from "../../Redux/reducer/slice";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function UserEditForm({setEditToggle}) {
    const dispatch = useDispatch()
    const token = useSelector(getAuthToken)
    const user = useSelector(getUserData)
    const [userName, setUserName] = useState({
        "userName": user.userName || ""
    })

    const handleCancel = () => {
        setEditToggle(false)
    }

    const handleChange = (event) => {
        setUserName({
            ...userName,
            [event.target.name]: event.target.value,
        })
    }

    const handleEdit = async (token, userName) => {
        const data = {token, userName}
        dispatch(updateUserData(data))
        setEditToggle(false)
    }

    return (
        <div>
            <div className="edit-wrapper">
                <h2>
                    Edit user info
                </h2>
                <div className="edit-row">
                    User name :
                    <input
                        type="text"
                        name="userName"
                        placeholder={user.userName}
                        value={userName.userName}
                        autoFocus
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="edit-row">
                    First name :
                    <input
                        type="text"
                        name="firstName"
                        placeholder={user.firstName}
                        value={userName.firstName}
                        disabled
                    />
                </div>
                <div className="edit-row">
                    Last name :
                    <input
                        type="text"
                        name="userName"
                        placeholder={user.lastName}
                        value={userName.lastName}
                        disabled
                    />
                </div>
            </div>
            <div className="edit-content">
                <button
                    className="edit-content-button"
                    onClick={() => handleEdit(token, userName)}
                >
                    Save
                </button>
                <button
                    className="edit-content-button"
                    onClick={() => handleCancel(token, userName)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default UserEditForm