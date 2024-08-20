import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Redux/index"
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Error from "./Pages/Error";


function Router() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <Header/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/sign-in" element={<Login/>}/>
                        <Route exact path="/profile" element={<Profile/>}/>
                        <Route path="*" element={<Error/>}/>
                    </Routes>
                    <Footer/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default Router;