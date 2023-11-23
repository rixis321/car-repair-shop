import { useState } from 'react'
import './App.css'
import AdminNavbar from "./components/navbar/AdminNavbar.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminSidebar from "./components/sidebar/AdminSidebar.jsx";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import AdminDashboard from "./routes/AdminDashboard.jsx";
import Home from "./routes/static/Home.jsx";

function App() {

  return (
    <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/dashboard"} element={<AdminDashboard/>}/>

    </Routes>
  )
}

export default App
