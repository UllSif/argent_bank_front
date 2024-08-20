import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "../Components/LoginForm/authSlice";
import {profileReducer} from "../Components/ProfileForm/profileSlice";

let state = {}

const store = configureStore({
    preloadedState: state,
    reducer: combineReducers({
        auth: authReducer,
        profile: profileReducer,
    })
});

export default store