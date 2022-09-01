import Form from './register';
import React, {useCallback} from "react";
import {useAuthContext} from "./hooks/useAuthContext";
import Submit from './Pages/Submit';
import Report from './Pages/Report';
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./nav/MainNavigation";
import Login from "./Pages/login";
import HomePage from "./Pages/homePage";
function App() {

    const {user} = useAuthContext()
        return (
            <BrowserRouter>
                <MainNavigation/>
                <Routes>
                    <Route path="/submit" element={user ? <Submit /> : <Navigate to={'/login'}/>}/>
                    <Route path="/report" element={user ? <Report /> : <Navigate to={'/login'}/>}/>
                    <Route path="/" element={<About />}/>
                    <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/'}/>}/>
                    <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'}/>}/>
                </Routes>
            </BrowserRouter>)
}

export default App;
