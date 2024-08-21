import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "../Components/AuthForm/authSlice";
import {userReducer} from "../Components/UserForm/userSlice";

let state = {}

const store = configureStore({
    preloadedState: state,
    reducer: combineReducers({
        auth: authReducer,
        profile: userReducer,
    })
});

export default store