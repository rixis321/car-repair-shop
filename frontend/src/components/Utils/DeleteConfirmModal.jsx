import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./confirm-modal-styles.css"
const DeleteConfirmationModal = ({ show, handleClose, handleDeleteConfirm, apiLink, modalTitle, modalBody, endService }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header className={"delete modal-header"} closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"delete"}>
                {modalBody}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Anuluj
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                    {endService ? "Zakończ" : "Usuń"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;