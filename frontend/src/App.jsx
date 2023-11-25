import { useState } from 'react'
import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import AdminDashboard from "./routes/AdminDashboard.jsx";
import Home from "./routes/static/Home.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import {AuthProvider} from "./security/AuthProvider.jsx";

function App() {

  return (
      <AuthProvider>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/dashboard/*"} element={<AdminDashboard/>}/>
              <Route path={"/login"} element={<LoginPage/>}/>
          </Routes>
      </AuthProvider>
  )
}

export default App
