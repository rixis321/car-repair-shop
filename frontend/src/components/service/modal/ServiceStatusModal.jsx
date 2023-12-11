import React, {useState} from 'react';
import {Modal, Button, Row, Alert, Col} from 'react-bootstrap';
import api from "../../../api/axiosConfig.js"
import {useContext} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";

const ServiceStatusChangeModal = ({ showStatusChangeModal, handleStatusChangeClick, handleStatusChangeConfirm, serviceId }) => {
    const [responseError,setResponseError]= useState(null)
    const { auth } = useContext(AuthContext);

    const handleStatusConfirm = async () => {
        try {
            const queryParams = new URLSearchParams({
                status: 'OCZEKUJE_NA_KLIENTA'
            })
            const response = await api.put(`/services/${serviceId}/status?${queryParams}`, {

            });

            if(response.status !== 200){
                return;
            }
            await api.get(`/services/${serviceId}`, {
                headers: {"Content-Type": "application/json", "Authorization": auth.accessToken}
            }).then(updatedServiceData => {
                console.log("wywolalem sie")
                handleStatusChangeConfirm(updatedServiceData.data);
            });
        } catch (err) {
            if (err.response && err.response.data) {
                setResponseError(err.response.data.message);
            }
        }
    };

    return (
        <Modal show={showStatusChangeModal} onHide={handleStatusChangeClick} size={'lg'}>
            <Modal.Header className={'reset modal-header'} closeButton>
                <Modal.Title>Zmiana statusu serwisu</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'reset'}>
                <p>Zakończenie pracy nad serwisem spowoduje wysłanie wiadomosci do klienta związanej z odbiorem samochodu. Czy jesteś pewny?</p>
            </Modal.Body>
            <Modal.Footer className={'reset'}>
                <Row>
                    {responseError && <Alert className={"mt-2"} variant="danger">{responseError}</Alert>}
                </Row>
                <Row className="mt-3">
                    <Col className="text-start">
                        <Button variant="primary" onClick={handleStatusChangeClick}>
                            Anuluj
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={handleStatusConfirm}>
                            Zakoncz prace
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default ServiceStatusChangeModal;