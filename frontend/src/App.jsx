import { useState } from 'react'
import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import AdminDashboard from "./routes/AdminDashboard.jsx";
import Home from "./routes/static/Home.jsx";
import LoginPage from "./routes/LoginPage.jsx";

function App() {

  return (
    <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/dashboard"} element={<AdminDashboard/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
    </Routes>
  )
}

export default App
