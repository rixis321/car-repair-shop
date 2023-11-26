import React, {useContext, useEffect} from 'react';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import AdminSidebar from "../../components/sidebar/AdminSidebar.jsx";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate} from "react-router";
import {Col, Container, Row} from "react-bootstrap";
import "./admin-dashboard-styles.css"
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
            <div className="admin-container">
                <AdminNavbar />
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <AdminSidebar />
                    </div>
                    <div className="content-wrapper">
                        <Container fluid>
                            <div className="example-content">
                                <h1>Przykładowa Zawartość</h1>
                                <p>Tutaj możesz umieścić swoją rzeczywistą zawartość.</p>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;