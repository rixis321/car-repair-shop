import React from 'react';
import { Modal } from 'react-bootstrap';
import ServiceEditForm from '../../../components/service/ServiceEditForm';
import "./modal-footer.css"
const ServiceEditModal = ({ showEditModal, handleEditButtonClick, handleEditButtonOnSave, serviceId, initialData }) => {
    return (
        <Modal show={showEditModal} onHide={handleEditButtonClick} size={'lg'}>
            <Modal.Header className={'reset modal-header'} closeButton>
                <Modal.Title>Edytuj dane serwisu</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'reset'}>
                <ServiceEditForm
                    serviceId={serviceId}
                    initialData={initialData}
                    onSave={handleEditButtonOnSave}
                    onCancel={handleEditButtonClick}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ServiceEditModal;
