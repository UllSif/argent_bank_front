import {useDispatch, useSelector} from 'react-redux'
import {getUserData, getAuthToken, getUserError, updateUserData} from "../../Redux/reducer/slice";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function UserEditForm({setEditToggle}) {
    const dispatch = useDispatch();
    const token = useSelector(getAuthToken);
    const userError = useSelector(getUserError);
    const user = useSelector(getUserData);

    const [userName, setUserName] = useState({
        "userName": user.userName || ""
    });
    const [hasSubmitted, setHasSubmitted] = useState(false); // État pour contrôler la soumission du formulaire

    let contentError = "";
    if (hasSubmitted && userError !== null) {
        contentError = <span className="errorMessage">{userError}</span>;
    }

    const handleCancel = () => {
        setEditToggle(false);
        setHasSubmitted(false); // Réinitialise l'état de soumission lors de l'annulation
    };

    const handleChange = (event) => {
        setUserName({
            ...userName,
            [event.target.name]: event.target.value,
        });
    };

    const handleEdit = async (token, userName) => {
        setHasSubmitted(true); // Indique que l'utilisateur a soumis le formulaire
        const data = { token, userName };

        if (userError !== null) {
            setEditToggle(true);
        } else {
            dispatch(updateUserData(data));
            setEditToggle(false);
            setHasSubmitted(false); // Réinitialise après soumission réussie
        }
    };

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
            {contentError}
            <div className="edit-content">
                <button
                    className="edit-content-button"
                    onClick={() => handleEdit(token, userName)}
                >
                    Save
                </button>
                <button
                    className="edit-content-button"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UserEditForm;
