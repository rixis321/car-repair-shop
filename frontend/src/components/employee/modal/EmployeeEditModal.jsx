import React from 'react';
import { Modal } from 'react-bootstrap';
import EmployeeEditForm from "../EmployeeEditForm.jsx";

const EmployeeEditModal = ({ show, handleClose, employeeId, initialData, onSave, onCancel }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title>Edytuj dane pracownika</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <EmployeeEditForm
                    employeeId={employeeId}
                    profileMode={false}
                    initialData={initialData}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeEditModal;
