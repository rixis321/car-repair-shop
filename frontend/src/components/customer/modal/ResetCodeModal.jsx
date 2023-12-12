import React from 'react';
import {Button, Modal, Row, Alert, Col} from 'react-bootstrap';

const ResetCodeModal = ({ show, handleClose, handleResetCode, responseError }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"reset modal-header"} closeButton>
                <Modal.Title>Czy na pewno chcesz zrestartować kod dostępu?</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"reset"}>
                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" onClick={handleClose}>
                            Anuluj
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={handleResetCode}>
                            Zresetuj
                        </Button>
                    </Col>
                    {responseError && <Alert className={"mt-2"} variant="danger">{responseError}</Alert>}
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ResetCodeModal;
