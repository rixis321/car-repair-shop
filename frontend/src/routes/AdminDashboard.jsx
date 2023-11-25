import React, {useContext, useEffect} from 'react';
import AdminNavbar from "../components/navbar/AdminNavbar.jsx";
import AdminSidebar from "../components/sidebar/AdminSidebar.jsx";
import AuthContext from "../security/AuthProvider.jsx";
import {useNavigate} from "react-router";

const AdminDashboard = () => {
    const{auth} = useContext(AuthContext)
    let navigate = useNavigate();

    useEffect(() => {
        if (!auth.accessToken) {
            navigate("/login");
        }
    }, [auth.accessToken]);
    return (
        <>
            <AdminNavbar/>
            <AdminSidebar/>
        </>
    );
};

export default AdminDashboard;