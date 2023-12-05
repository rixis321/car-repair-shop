import React from 'react';
import {useContext, useEffect, useState} from  "react"
import AuthContext from "../../security/AuthProvider.jsx";
import {Link, Navigate} from "react-router-dom";
import api from "../../api/axiosConfig.js";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Button, Container} from "react-bootstrap";
import GenericTable from "../../components/Utils/GenericTable.jsx";


const Customers = () => {

    const { auth } = useContext(AuthContext);
    const [responseData, setResponseData] = useState(null);

    const [customersPerPage] = useState(7);
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
            const response = await api.get("/customers", {
                headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
            });

            setResponseData(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(responseData)
    // zmiana strony
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleSort = (key) => {
        setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    };
    const handleDetailsClick = (customerId) => {
        return <Link to={`/customers/${customerId}`}>Szczegóły</Link>;
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
                        <h2>Klienci</h2>
                        <Container fluid>
                            <GenericTable
                                data={responseData}
                                columns={[
                                    { key: 'name', label: 'Imie' },
                                    { key: 'lastname', label: 'Nazwisko' },
                                    { key: 'phone', label: 'Nr. telefonu' },
                                    { key: 'accessCode', label: 'Kod dostepu' },
                                ]}
                                onDelete={(customerId) => handleDelete(customerId)}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                sortConfig={sortConfig}
                                onSort={(key) => handleSort(key)}
                                currentPage={currentPage}
                                itemsPerPage={customersPerPage}
                                onDetailsClick={(customerId) => handleDetailsClick(customerId)}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Customers;