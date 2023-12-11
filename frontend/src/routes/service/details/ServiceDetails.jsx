import React from 'react';
import {useContext} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Navigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../../../api/axiosConfig.js";
import AdminNavbar from "../../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Modal, Pagination, Row, Spinner} from "react-bootstrap";
import "./service-details.css"
import ServiceEditForm from "../../../components/service/ServiceEditForm";
import DateFormat from "../../../utils/DateFormat.jsx";
import ServiceHistoryForm from "../../../components/service/ServiceHistoryForm";
import ServiceHistoryList from "../../../components/service/ServiceHistoryList.jsx";
import ServiceHistoryPagination from "../../../components/service/ServiceHistoryPagination.jsx";
import ServiceEditModal from "../../../components/service/modal/ServiceEditModal.jsx";
import ServiceProgressModal from "../../../components/service/modal/ServiceProgressModal.jsx";
import ServiceStatusModal from "../../../components/service/modal/ServiceStatusModal";

const ServiceDetails = () => {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showProgressServiceModal, setShowProgressServiceModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);


    //paginacja
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServiceHistory = serviceData?.serviceHistory?.slice(indexOfFirstItem, indexOfLastItem) || [];

    const totalPages = Math.ceil((serviceData?.serviceHistory?.length || 0) / itemsPerPage);
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const handleStatusModalClick = () =>{
        setShowStatusModal(!showStatusModal);
    }
    const handleStatusChange = (updatedData) =>{
        setServiceData(prevData => ({ ...prevData, ...updatedData }));
        handleStatusModalClick();
    }

    const handleProgressServiceClick = () =>{
        setShowProgressServiceModal(!showProgressServiceModal)
    }
    const handleProgressServiceOnSave = (updatedData) =>{
        console.log("handleProgressServiceOnSave called with data:", updatedData);
        setServiceData(prevData => ({ ...prevData, ...updatedData }));
        console.log("Updated serviceData:", serviceData);
        handleProgressServiceClick()
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEditButtonClick = () => {
        setShowEditModal(!showEditModal);
    };
    const handleEditButtonOnSave = (updatedData) => {
        setServiceData({ ...updatedData });
        handleEditButtonClick();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/services/${id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setServiceData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    console.log(serviceData)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dane szczegółowe pracy serwisowej</h2>
                        <Container fluid>
                            <div className="row mb-1">
                                <div className="col-md-13 personal-data">
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <ul className="custom-list">
                                            <li><strong>Opis</strong> {serviceData.description}</li>
                                            <li><strong>Szacowany koszt</strong> {serviceData.cost +" zł"}</li>
                                            <li>
                                                <strong>Status </strong>
                                                {serviceData.serviceStatus === "W_TRAKCIE" ? "W TRAKCIE" :
                                                    (serviceData.serviceStatus === "OCZEKUJE_NA_KLIENTA" ? "OCZEKUJE NA KLIENTA" : serviceData.serviceStatus)}
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <Row className={"mt-0"}>
                                <div className="d-flex mb-3 option-buttons">
                                    <Col md={1}  className="mb-1">
                                        <Button block onClick={handleEditButtonClick} >Edytuj dane serwisu</Button>
                                    </Col>
                                    <Col md={4}  className="mb-1">
                                        <Button block onClick={handleProgressServiceClick} >Aktualizuj przebieg naprawy</Button>
                                    </Col>
                                    <Col className="mb-1">
                                        <Button block onClick={handleStatusModalClick} >Uznaj prace za skończoną</Button>
                                    </Col>
                                    <ServiceEditModal
                                        showEditModal={showEditModal}
                                        handleEditButtonClick={handleEditButtonClick}
                                        handleEditButtonOnSave={handleEditButtonOnSave}
                                        serviceId={id}
                                        initialData={serviceData}
                                    />
                                    <ServiceProgressModal
                                        showProgressServiceModal={showProgressServiceModal}
                                        handleProgressServiceClick={handleProgressServiceClick}
                                        handleProgressServiceOnSave={handleProgressServiceOnSave}
                                        serviceId={id}
                                        initialData={serviceData}
                                    />
                                    <ServiceStatusModal
                                    showStatusChangeModal={showStatusModal}
                                    handleStatusChangeClick={handleStatusModalClick}
                                    handleStatusChangeConfirm={handleStatusChange}
                                    serviceId={id}
                                    />
                                </div>
                            </Row>
                        </Container>
                        <h2>Przebieg pracy</h2>
                        <Container fluid>
                            {currentServiceHistory.length > 0 ? (
                                <div className="custom-list history">
                                    {currentServiceHistory.map((history, index) => (
                                        <Row key={index} className="work-history-item">
                                            <Row>
                                                <Col>
                                                    <strong>Opis:</strong> {history.description}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <strong style={{ marginLeft: '10px' }}>
                                                        Nazwa pracownika:
                                                    </strong>{' '}
                                                    {history.fullEmployeeName}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <strong>Data dodania:</strong> {DateFormat(history.date)}
                                                </Col>
                                            </Row>
                                        </Row>
                                    ))}
                                </div>
                            ) : (
                                <Alert className={'alert-info'} variant="info">
                                    Brak przeprowadzonych prac.
                                </Alert>
                            )}
                            {totalPages > 1 && (
                                <Pagination className="justify-content-center mt-3">
                                    {[...Array(totalPages).keys()].map((page) => (
                                        <Pagination.Item
                                            key={page + 1}
                                            active={page + 1 === currentPage}
                                            onClick={() => handlePageChange(page + 1)}
                                        >
                                            {page + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            )}
                        </Container>
                        <h2>Wystawione faktury</h2>
                        <ServiceHistoryList currentServiceHistory={currentServiceHistory} />
                        <ServiceHistoryPagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetails;