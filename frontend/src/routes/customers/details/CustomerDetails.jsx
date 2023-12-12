import React from 'react';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Navigate, useParams} from "react-router";
import api from "../../../api/axiosConfig.js";
import AdminNavbar from "../../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import ListItem from "../../../components/Utils/ListItem.jsx";
import "./customer-details.css"
import CustomerEditForm from "../../../components/customer/CustomerEditForm.jsx";
import ResetCodeModal from "../../../components/customer/modal/ResetCodeModal.jsx";
import EditCustomerModal from "../../../components/customer/modal/EditCustomerModal.jsx";

const CustomerDetails = () => {
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [customerData, setCustomerData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showResetCodeModal,setShowResetCodeModal]= useState(false)
    const [responseError,setResponseError] = useState('')

    const handleShowResetCodeModal = () => {
       setShowResetCodeModal(!showResetCodeModal)
    };
    const handleEditButtonClick = () => {
        setShowEditModal(!showEditModal);
    };

    const handleResetCode = async ()=>{
        try{
            const response = await api.put(`customers/${id}/reset`,null,{
                headers: {"Content-Type": "Application/json", "Authorization": auth.accessToken}
            })
            setCustomerData((prevData) => ({
                ...prevData,
                accessCode: response.data,
            }));
            if (response.status !== 200) {
                return;
            }
            handleShowResetCodeModal()
        }catch (err){
            console.log(err)
            if (err.response && err.response.data) {
                setResponseError(err.response.data.message);
            } else {
                setResponseError('Wystąpił błąd podczas edytowania danych.');
            }
        }
    }
    const handleEditButtonOnSave= (updatedData) => {
        setCustomerData(updatedData);
        handleEditButtonClick()
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/customers/${id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setCustomerData(response.data);
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
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dane szczegółowe klienta</h2>
                        <Container fluid>
                            <div className="row mb-1">
                                <div className="col-md-6 personal-data">
                                    <h3>Dane osobowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <ul className="custom-list personal-data">
                                            <li><strong>Imię</strong> {customerData.name}</li>
                                            <li><strong>Nazwisko</strong> {customerData.lastname}</li>
                                            <li><strong>Nr. telefonu</strong>{customerData.phone}</li>
                                            <li><strong>Kod dostępu</strong> {customerData.accessCode}</li>
                                        </ul>
                                    )}
                                </div>
                                <div className="col-md-6 address-data">
                                    <h3>Dane adresowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <ul className="custom-list address-data">

                                            <li><strong>Kod pocztowy</strong>{customerData.userAddressDto.zipcode}</li>
                                            <li><strong>Miasto</strong>{customerData.userAddressDto.city}</li>
                                            <li><strong>Nazwa ulicy</strong>{customerData.userAddressDto.streetName}</li>
                                            <li><strong>Numer ulicy </strong> {customerData.userAddressDto.streetNumber}</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <Row className={"mt-0"}>
                                <div className="d-flex mb-3 option-buttons">
                                    <Col md={1}  className="mb-1">
                                        <Button block onClick={handleEditButtonClick} >Edytuj dane klienta</Button>
                                    </Col>
                                    <Col md={3}  className="mb-3">
                                        <Button block onClick={handleShowResetCodeModal} >Zresetuj kod dostępu</Button>
                                    </Col>
                                    <EditCustomerModal
                                        show={showEditModal}
                                        handleClose={handleEditButtonClick}
                                        handleEditButtonOnSave={handleEditButtonOnSave}
                                        customerId={id}
                                        initialData={customerData}
                                    />
                                    <ResetCodeModal
                                        show={showResetCodeModal}
                                        handleClose={handleShowResetCodeModal}
                                        handleResetCode={handleResetCode}
                                        responseError={responseError}
                                    />
                                </div>
                            </Row>
                        </Container>
                        <h2>Przypisane samochody</h2>
                        <Container fluid>
                            {customerData?.cars && customerData.cars.length > 0 ? (
                                <ListItem
                                    items={customerData?.cars || []}
                                    template={(car) => (
                                        <>
                                            <strong>Marka:</strong> {car.brand}<br />
                                            <strong>Model:</strong> {car.model}<br />
                                            <strong>Nr. rejestracyjny: </strong>{car.registrationNumber}<br />
                                        </>
                                    )}
                                    loading={loading}
                                    detailsLinkBuilder={(car) => `/cars/${car.id}`}
                                    itemsPerPage={4}
                                />
                            ):(
                                <Alert className={"alert-info"} variant="info">Brak przypisanych samochodów.</Alert>
                            )}
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerDetails;