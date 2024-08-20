import { useDispatch, useSelector } from 'react-redux'

import { getUserData, updateUserData } from "./profileSlice";
import { getAuthToken } from "../LoginForm/authSlice";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function UserEditForm({ setEditToggle }) {
    const dispatch = useDispatch()
    const token = useSelector(getAuthToken)
    const user = useSelector(getUserData)
    const [userNames, setUserNames] = useState({
        userName: '',
    })

    const canSave = Boolean(userNames.firstName) && Boolean(userNames.lastName)

    const handleCancel = () => {
        setEditToggle(false)
    }

    const handleChange = (event) => {
        setUserNames({
            ...userNames,
            [event.target.name]: event.target.value,
        })
    }

    const handleEdit = async (token, userNames) => {
        const data = { token, userNames }
        if (canSave) {
            dispatch(updateUserData(data))
            setEditToggle(false)
        }
    }

    return (
        <div>
            <div className="edit-wrapper">
                <input
                    type="text"
                    name="userName"
                    placeholder={user.userName}
                    value={userNames.userName}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="edit-wrapper">
                <button
                    className="edit-content-button"
                    disabled={!canSave}
                    onClick={() => handleEdit(token, userNames)}
                >
                    Save
                </button>
                <button
                    className="edit-content-button"
                    onClick={() => handleCancel(token, userNames)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default UserEditForm