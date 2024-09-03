import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {authReducer, userReducer} from "../reducer/slice";

let state = {}

const store = configureStore({
    preloadedState: state,
    reducer: combineReducers({
        auth: authReducer,
        user: userReducer,
    })
});

export default store