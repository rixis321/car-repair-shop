import React from 'react';
import {useContext, useEffect, useState} from  "react"
import AuthContext from "../../security/AuthProvider.jsx";
import {Link, Navigate} from "react-router-dom";
import api from "../../api/axiosConfig.js";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Button, Container} from "react-bootstrap";
import GenericTable from "../../components/Utils/GenericTable.jsx";

const Services = () => {

    const { auth } = useContext(AuthContext);
    const [responseData, setResponseData] = useState(null);
    const [filterState, setFilterState] = useState(null);

    const [servicesPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    const handleFilter = (state) => {
        setFilterState(state);
    };

    const formatStatus = (status) => {
        return status.replace(/_/g, " ");
    };
    const formatData = (data) => {
        if (!data) {
            return [];
        }

        return data.map((item) => {
            return {
                ...item,
                serviceStatus: formatStatus(item.serviceStatus),
            };
        });
    };

    const filterData = (data, filterState) => {
        if (!filterState) return data;

        return data.filter(item => item.serviceStatus === filterState);
    };


    useEffect(() => {
        fetchData();
    }, [auth.accessToken]);

    const fetchData = async () => {
        try {
            const response = await api.get("/services", {
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
    const handleDetailsClick = (serviceId) => {
        return <Link to={`/services/${serviceId}`}>Szczegóły</Link>;
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
                        <h2>Prace serwisowe</h2>
                        <div className="filter-buttons ">
                            <Button variant="primary" onClick={() => handleFilter('')}>Wszystkie</Button>
                            <Button variant="primary" onClick={() => handleFilter('ROZPOCZETO')}>Nowe</Button>
                            <Button variant="primary" onClick={() => handleFilter('W TRAKCIE')}>W trakcie</Button>
                            <Button variant="primary" onClick={() => handleFilter('OCZEKUJE NA KLIENTA')}>Oczekujące odbioru</Button>
                            <Button variant="primary" onClick={() => handleFilter("ZAKONCZONE")}>Zakonczone</Button>
                        </div>
                        <Container fluid>
                            <GenericTable
                                data={filterData(formatData(responseData), filterState)}
                                columns={[
                                    { key: 'description', label: 'Opis pracy serwisowej' },
                                    { key: 'cost', label: 'Koszt' },
                                    { key: 'serviceStatus', label: 'Status serwisu' },
                                ]}
                                onDelete={(employeeId) => handleDelete(employeeId)}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                sortConfig={sortConfig}
                                onSort={(key) => handleSort(key)}
                                currentPage={currentPage}
                                itemsPerPage={servicesPerPage}
                                onDetailsClick={(diagnosisId) => handleDetailsClick(diagnosisId)}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;