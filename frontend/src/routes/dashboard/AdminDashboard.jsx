import React, {useContext, useEffect} from 'react';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate} from "react-router";
import {Card, Col, Container, Row, Table} from "react-bootstrap";
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
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Panel głowny</h2>
                        <Container fluid>
                            <div className="example-content">
                                    <Row className={"cards-row"}>
                                        <DashboardCard title="Klienci" iconName="bi-building-fill" number="15" />
                                        <DashboardCard title="Pracownicy" iconName="bi-person-vcard" number="15" />
                                        <DashboardCard title="Serwisy wymagające dodania" iconName="bi bi-gem" number="15" />
                                    </Row>
                            </div>
                        </Container>
                        <h2 className={"activity"}>Ostatnia aktywność</h2>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Imię i Nazwisko</th>
                                <th>Opis Czynności</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Populate the table rows with actual data */}
                            <tr>
                                <td>John Doe</td>
                                <td>Wykonano zadanie X</td>
                                <td>2023-11-28</td>
                            </tr>
                            {/* Add more rows as needed */}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;