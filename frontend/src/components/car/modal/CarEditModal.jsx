import React from 'react';
import { Modal } from 'react-bootstrap';
import CarEditForm from "../CarEditForm.jsx";

const CarEditModal = ({ show, handleClose, carId, initialData, onSave, onCancel }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title>Edytuj dane samochodu</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <CarEditForm carId={carId} initialData={initialData} onSave={onSave} onCancel={onCancel} />
            </Modal.Body>
        </Modal>
    );
};

export default CarEditModal;
