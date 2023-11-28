import React, { useContext, useEffect, useState } from 'react';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import AuthContext from "../../security/AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router";
import { Container, Row } from "react-bootstrap";
import "./admin-dashboard-styles.css";
import DashboardCard from "../../components/dashboard/DashboardCard.jsx";
import { jwtDecode } from "jwt-decode";
import api from "../../api/axiosConfig.js";
import dateFormat from "../../utils/DateFormat.jsx";

const AdminDashboard = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();
    const [responseData, setResponseData] = useState(null);
    const [dashboardCard, setDashboardCard] = useState(null);

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to= '/login' />;
    }
    useEffect(() => {
        if (!auth.accessToken) {
            return <Navigate to= '/login' />;
        }
    }, [auth.accessToken]);

    //pobierz dane z api na bazie tokena jesli sie zmienil
    useEffect(() => {
        getDashboardData();
    }, [auth.accessToken]);

    const token = auth.accessToken ? jwtDecode(auth.accessToken) : null;
    const getDashboardData = async () => {
        console.log(token.role);
        try {
            if (token.role === "ADMIN" || token.role === "MECHANIK") {
                const response = await api.get(`/dashboard/${token.id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setResponseData(response.data);
                setDashboardCard(<DashboardCard title="Serwisy wymagające dodania" iconName="bi bi-gem" number={response.data.servicesToAdd} />);
            } else if (token.role === "RECEPCJONISTA") {
                const response = await api.get(`/dashboard/recept/${token.id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setResponseData(response.data);
                 setDashboardCard(<DashboardCard title="Samochody do odebrania" iconName="bi bi-gem" number={response.data.totalCarsToPickUp} />);
            } else {
                // todo error strona
                navigate("/error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Panel główny</h2>
                        <Container fluid>
                            <div className="example-content">
                                <Row className={"cards-row"}>
                                    <DashboardCard title="Klienci" iconName="bi-building-fill" number={responseData ? responseData.totalClients : 0} />
                                    <DashboardCard title="Pracownicy" iconName="bi-person-vcard" number={responseData ? responseData.totalEmployees : 0} />
                                    {dashboardCard}
                                </Row>
                            </div>
                        </Container>
                        { (token.role === "ADMIN" || token.role === "MECHANIK") &&
                            <>
                                <h2 className={"activity"}>Ostatnia aktywność</h2>
                                {responseData && responseData.serviceHistory && responseData.serviceHistory.map((historyItem, index) => (
                                    <div key={index} className="activity-item">
                                        <p><strong>Data wprowadzenia:</strong> {dateFormat(historyItem.date)}</p>
                                        <p><strong>Opis czynności:</strong> {historyItem.description}</p>
                                        {token.role !== "MECHANIK" && (
                                            <p><strong>Pracownik:</strong> {historyItem.fullEmployeeName}</p>
                                        )}
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
