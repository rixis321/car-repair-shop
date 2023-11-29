// Employees.jsx
import React, { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import GenericTable from "../../components/GenericTable.jsx";
import { Button, Container, Row } from "react-bootstrap";
import AuthContext from "../../security/AuthProvider.jsx";
import api from "../../api/axiosConfig.js";
import { useState, useEffect } from "react";

const Employees = () => {
    const { auth } = useContext(AuthContext);
    const [responseData, setResponseData] = useState(null);

    const [employeesPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    useEffect(() => {
        fetchData();
    }, [auth.accessToken]);

    const fetchData = async () => {
        try {
            const response = await api.get("/employees", {
                headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
            });
            setResponseData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    // paginacja
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = responseData ? responseData.slice(indexOfFirstEmployee, indexOfLastEmployee) : [];

    // zmiana strony
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleSort = (key) => {
        setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    };
    const handleDetailsClick = (employeeId) => {
        // Przekierowanie do szczegółów pracownika
        // Zakładając, że używasz react-router-dom
        // Poniżej znajduje się przykład użycia Link do przekierowania
        return <Link to={`/employees/${employeeId}`}>Szczegóły</Link>;
    };

    console.log(responseData)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Pracownicy</h2>
                        <Container fluid>
                            <GenericTable
                                data={responseData}
                                columns={[
                                    { key: 'name', label: 'Imię' },
                                    { key: 'lastname', label: 'Nazwisko' },
                                    { key: 'phone', label: 'Telefon' },
                                    { key: 'email', label: 'Email' },
                                    { key: 'roles[0].name', label: 'Rola' },
                                ]}
                                onDelete={(employeeId) => handleDelete(employeeId)}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                sortConfig={sortConfig}
                                onSort={(key) => handleSort(key)}
                                currentPage={currentPage}
                                itemsPerPage={employeesPerPage}
                                onDetailsClick={(employeeId) => handleDetailsClick(employeeId)}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Employees;
