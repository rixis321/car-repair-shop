import React from 'react';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Container, Row} from "react-bootstrap";
import {useContext, useEffect} from "react"
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate, useParams} from "react-router";
import {Navigate} from "react-router-dom";


const EmployeeDetails = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();
    const { id } = useParams();

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    useEffect(() => {
    }, [auth.accessToken]);
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dane szczegółowe</h2>
                        <Container fluid>

                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetails;