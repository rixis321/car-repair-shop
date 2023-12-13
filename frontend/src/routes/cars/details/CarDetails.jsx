import React from 'react';
import {useContext, useState} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Navigate, useParams} from "react-router";
import {useEffect} from "react";
import api from "../../../api/axiosConfig.js";
import AdminNavbar from "../../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import ListItem from "../../../components/Utils/ListItem.jsx";
import dateFormat from "../../../utils/DateFormat.jsx";
import "./car-details.css"
import CarEditForm from "../../../components/car/CarEditForm.jsx";
import CarEditModal from "../../../components/car/modal/CarEditModal.jsx";
const CarDetails = () => {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [carData, setCarData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    const handleEditButtonClick = () => {
        setShowEditModal(!showEditModal);
    };
    const handleEditButtonOnSave = (updatedData) => {
        setCarData({ ...updatedData });
        handleEditButtonClick();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/cars/${id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setCarData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
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
                        <h2>Dane szczegółowe samochodu</h2>
                        <Container fluid>
                            <div className="row mb-1">
                                <div className="col-md-6 personal-data">
                                    <h3>Dane podstawowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <ul className="custom-list personal-data">
                                            <li><strong>Marka</strong> {carData.brand}</li>
                                            <li><strong>Model</strong> {carData.model}</li>
                                            <li><strong>Typ nadwozia</strong>{carData.type}</li>
                                            <li><strong>Nr. rejestracyjny</strong> {carData.registrationNumber}</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="col-md-6 address-data">
                                    <h3>Dane techniczne</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <ul className="custom-list address-data">

                                            <li><strong>Rok produkcji</strong>{carData.carInfoDto.productionYear}</li>
                                            <li><strong>Rodzaj skrzyni biegów</strong>{carData.carInfoDto.gearboxType}</li>
                                            <li><strong>Rodzaj silnika</strong>{carData.carInfoDto.fuelType}</li>
                                            <li><strong>Pojemność silnika</strong>{carData.carInfoDto.engine}</li>
                                            <li><strong>Numer VIN</strong> {carData.carInfoDto.vinNumber}</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <Row className={"mt-0"}>
                                <div className="d-flex mb-3 option-buttons">
                                    <Col md={1}  className="mb-1">
                                        <Button block onClick={handleEditButtonClick} >Edytuj dane samochodu</Button>
                                    </Col>
                                    <CarEditModal
                                        show={showEditModal}
                                        handleClose={() => setShowEditModal(false)}
                                        carId={id}
                                        initialData={carData}
                                        onSave={handleEditButtonOnSave}
                                        onCancel={() => setShowEditModal(false)}
                                    />
                                </div>
                            </Row>
                        </Container>
                        <h2>Przeprowadzone diagnozy</h2>
                        <Container fluid>
                            {carData?.diagnoses && carData.diagnoses.length > 0 ? (
                                <ListItem
                                    items={carData?.diagnoses || []}
                                    template={(diagnosis) => (
                                        <>
                                            <strong>Opis:</strong> {diagnosis.description}<br />
                                            <strong>Status:</strong> {diagnosis.clientApproval}<br />
                                            <strong>Szacowany koszt: </strong>{diagnosis.estimatedCost+ " zl"}<br />
                                            <strong>Data: </strong>{dateFormat(diagnosis.diagnosisDate)}<br />
                                        </>
                                    )}
                                    loading={loading}
                                    detailsLinkBuilder={(diagnosis) => `/diagnosis/${diagnosis.id}`}
                                    itemsPerPage={4}
                                />
                            ):(
                                <Alert className={"alert-info"} variant="info">Brak postawionych diagnoz.</Alert>
                            )}
                        </Container>
                        <h2>Przeprowadzone prace serwisowe</h2>
                        <Container fluid>
                            {carData?.services && carData.services.length > 0 ? (
                                <ListItem
                                    items={carData?.services || []}
                                    template={(service) => (
                                        <>
                                            <strong>Opis:</strong> {service.description}<br />
                                            <strong>Status:</strong> {service.serviceStatus}<br />
                                            <strong>Koszt: </strong>{service.cost + " zl"}<br />
                                        </>
                                    )}
                                    loading={loading}
                                    detailsLinkBuilder={(service) => `/services/${service.id}`}
                                    itemsPerPage={4}
                                />
                            ):(
                                <Alert className={"alert-info"} variant="info">Brak przeprowadzonych serwisów.</Alert>
                            )}
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarDetails;