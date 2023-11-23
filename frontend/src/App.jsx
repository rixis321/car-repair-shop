import { useState } from 'react'
import './App.css'
import AdminNavbar from "./components/Navbar/AdminNavbar.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminSidebar from "./components/Sidebar/AdminSidebar.jsx";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import AdminDashboard from "./routes/AdminDashboard.jsx";

function App() {

  return (
    <Routes>
        <Route path={"/dashboard"} element={<AdminDashboard/>} >
        </Route>
    </Routes>
  )
}

export default App
