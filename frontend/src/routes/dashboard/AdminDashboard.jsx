import React, {useContext, useEffect} from 'react';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import AdminSidebar from "../../components/sidebar/AdminSidebar.jsx";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate} from "react-router";
import {Card, Col, Container, Row} from "react-bootstrap";
import "./admin-dashboard-styles.css"
import DashboardCard from "../../components/dashboard/DashboardCard.jsx";
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
                        <h2>Panel głowny</h2>
                        <Container fluid>
                            <div className="example-content">
                                <Row>
                                    <Row className={"cards-row"}>
                                        <DashboardCard title="Klienci" iconName="bi-building-fill" number="15" />
                                        <DashboardCard title="Pracownicy" iconName="bi-building-fill" number="15" />
                                        <DashboardCard title="Serwisy wymagające dodania" iconName="bi-building-fill" number="15" />
                                    </Row>
                                </Row>
                            </div>
                        </Container>
                        <h2 className={"activity"}>Ostatnia aktywność</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;