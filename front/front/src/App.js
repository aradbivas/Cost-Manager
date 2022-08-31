import Form from './register';
import React, {useCallback} from "react";

import Submit from './Pages/Submit';
import Report from './Pages/Report';
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import MainNavigation from "./nav/MainNavigation";
import Login from "./Pages/login";
import HomePage from "./Pages/homePage";
function App() {

    // const {token, setToken} = React.useState(false);
    // const {userId, setUserId} = React.useState(false);
    // const login = useCallback((uid, token) =>
    //     {
    //         setToken(token);
    //         setUserId(uid);
    //     }, []);
    // const logout = useCallback(() =>
    // {
    //     setToken(null);
    //     setUserId(null);
    // }, [])
        return (
            <BrowserRouter>
                <MainNavigation/>
                <Routes>
                    <Route path="/submit" element={<Submit />}/>
                    <Route path="/report" element={<Report />}/>
                    <Route path="/" element={<About />}/>
                    <Route path='/signup' element={<Signup />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/register" element={<Form />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </BrowserRouter>)
}

export default App;
