import React from 'react';
import { Modal } from 'react-bootstrap';
import ServiceHistoryForm from '../../../components/service/ServiceHistoryForm';

const ServiceProgressModal = ({
                                  showProgressServiceModal,
                                  handleProgressServiceClick,
                                  handleProgressServiceOnSave,
                                  serviceId,
                                  initialData,
                              }) => {
    return (
        <Modal show={showProgressServiceModal} onHide={handleProgressServiceClick} size={'lg'}>
            <Modal.Header className={'reset modal-header'} closeButton>
                <Modal.Title>Przebieg pracy serwisowej</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'reset'}>
                <ServiceHistoryForm
                    serviceId={serviceId}
                    initialData={initialData}
                    onSave={handleProgressServiceOnSave}
                    onCancel={handleProgressServiceClick}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ServiceProgressModal;
