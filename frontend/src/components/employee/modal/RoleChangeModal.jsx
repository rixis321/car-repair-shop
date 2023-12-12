import React from 'react';
import { Modal } from 'react-bootstrap';
import RoleForm from "../RoleForm.jsx";

const RoleChangeModal = ({ show, handleClose, employeeId, initialData, onSave, onCancel }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title className={"modal-title"}>Edytuj uprawnienia pracownika</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <RoleForm
                    employeeId={employeeId}
                    initialData={initialData}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            </Modal.Body>
        </Modal>
    );
};

export default RoleChangeModal;
