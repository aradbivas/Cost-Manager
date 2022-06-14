import Form from './AddUser';
import React from "react";
import Submit from './Submit';
import Report from './Report';
import About from "./About";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "./nav/MainNavigation";
function App() {
  return (
    <BrowserRouter>
      <MainNavigation/>
        <Routes>
            <Route path="/" element={<About />}/>

            <Route path="/adduser" element={<Form />}/>
          <Route path="/submit" element={<Submit />}/>
          <Route path="/report" element={<Report />}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
