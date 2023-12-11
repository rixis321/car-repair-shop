import React from 'react';
import {useContext} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Navigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../../../api/axiosConfig.js";
import AdminNavbar from "../../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import "./diagnoses-details.css"
import DateFormat from "../../../utils/DateFormat.jsx";
import DiagnosesEditForm from "../../../components/diagnosis/DiagnosesEditForm.jsx";
import {Link} from "react-router-dom";

const DiagnosesDetails = () => {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [diagnosisData, setDiagnosisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    const handleEditButtonClick = () => {
        setShowEditModal(!showEditModal);
    };
    const handleEditButtonOnSave = (updatedData) => {
        setDiagnosisData({ ...updatedData });
        handleEditButtonClick();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/diagnosis/${id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setDiagnosisData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(diagnosisData)
    console.log(diagnosisData)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dane szczegółowe diagnozy</h2>
                        <Container fluid>
                            <div className="row mb-1">
                                <div className="col-md-13 personal-data">
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <ul className="custom-list">
                                            <li><strong>Opis</strong> {diagnosisData.description}</li>
                                            <li><strong>Szacowany koszt</strong> {diagnosisData.estimatedCost +" zł"}</li>
                                            <li><strong>Status </strong>{diagnosisData.clientApproval}</li>
                                            <li><strong>Data dodania</strong> {DateFormat(diagnosisData.diagnosisDate)}</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <Row className={"mt-0"}>
                                <div className="d-flex mb-3 option-buttons">
                                    <Col md={1}  className="mb-1">
                                        <Button block onClick={handleEditButtonClick} >Edytuj dane diagnozy</Button>
                                    </Col>
                                    <Modal show={showEditModal} onHide={handleEditButtonClick} size={"lg"}>
                                        <Modal.Header className={"reset modal-header"} closeButton>
                                            <Modal.Title>Edytuj dane diagnozy</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className={"reset"}>
                                            <DiagnosesEditForm
                                                diagnosisId={id}
                                                initialData={diagnosisData}
                                                onSave={handleEditButtonOnSave}
                                                onCancel={handleEditButtonClick}
                                            />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </Row>
                        </Container>
                        <h2>Dane samochodu, którego dotyczy diagnoza</h2>
                        <Container fluid>
                            {diagnosisData?.car ? (
                                <ul className="custom-list">
                                    <li>
                                        <strong>Marka:</strong> {diagnosisData.car.brand}
                                    </li>
                                    <li>
                                        <strong>Model:</strong> {diagnosisData.car.model}
                                    </li>
                                    <li>
                                        <strong>Nr. rejestracyjny:</strong> {diagnosisData.car.registrationNumber}
                                    </li>
                                    <li>
                                        <strong>Rodzaj nadwozia:</strong> { diagnosisData.car.type}
                                    </li>
                                    <Link to={`/cars/${diagnosisData.car.id}`}>Szczegóły</Link>
                                </ul>
                            ) : (
                                <Alert className={"alert-info"} variant="info">Brak samochodu.</Alert>
                            )}
                        </Container>
                        <h2>Przypisana praca serwisowa</h2>
                        <Container fluid>
                            {diagnosisData?.service ? (
                                <ul className="custom-list">
                                    <li>
                                        <strong>Opis:</strong> {diagnosisData.service.description}
                                    </li>
                                    <li>
                                        <strong>Status:</strong> {diagnosisData.service.serviceStatus}
                                    </li>
                                    <li>
                                        <strong>Koszt:</strong> {diagnosisData.service.cost + " zł"}
                                    </li>
                                    <Link to={`/services/${diagnosisData.service.id}`}>Szczegóły</Link>
                                </ul>
                            ) : (
                                <Alert className={"alert-info"} variant="info">Brak przypisanego serwisu.</Alert>
                            )}
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiagnosesDetails;