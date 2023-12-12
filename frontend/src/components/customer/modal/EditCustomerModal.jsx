import React from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import CustomerEditForm from "../CustomerEditForm.jsx";


const EditCustomerModal = ({ show, handleClose, handleEditButtonOnSave, customerId, initialData }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title>Edytuj dane klienta</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <CustomerEditForm
                    customerId={customerId}
                    initialData={initialData}
                    onSave={handleEditButtonOnSave}
                    onCancel={handleClose}
                />
            </Modal.Body>
        </Modal>
    );
};

export default EditCustomerModal;
