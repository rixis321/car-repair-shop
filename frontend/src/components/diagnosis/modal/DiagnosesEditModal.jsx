import React from 'react';
import { Modal } from 'react-bootstrap';
import DiagnosesEditForm from "../DiagnosesEditForm.jsx";


const DiagnosesEditModal = ({ show, handleClose, diagnosisId, initialData, onSave, onCancel }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title>Edytuj dane diagnozy</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <DiagnosesEditForm
                    diagnosisId={diagnosisId}
                    initialData={initialData}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            </Modal.Body>
        </Modal>
    );
};

export default DiagnosesEditModal;
