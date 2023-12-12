import React from 'react';
import { Modal } from 'react-bootstrap';
import PasswordResetForm from "../PasswordResetForm.jsx";


const PasswordResetModal = ({ show, handleClose, employeeId, onCancel, onPasswordReset }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title className={"modal-title"}>Zresetuj hasło</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <PasswordResetForm
                    profileMode={false}
                    employeeId={employeeId}
                    onCancel={onCancel}
                    onPasswordReset={onPasswordReset}
                />
            </Modal.Body>
        </Modal>
    );
};

export default PasswordResetModal;
