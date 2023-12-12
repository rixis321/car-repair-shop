import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import DateFormat from "../../utils/DateFormat.jsx";


const ServiceHistoryList = ({ currentServiceHistory, onDelete }) => {
    return (
        <div className="custom-list history">
            {currentServiceHistory.map((history, index) => (
                <Row key={index} className="work-history-item">
                    <Row>
                        <Col>
                            <strong>Opis:</strong> {history.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <strong style={{ marginLeft: '10px' }}>Nazwa pracownika:</strong>{' '}
                            {history.fullEmployeeName}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <strong>Data dodania:</strong> {DateFormat(history.date)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                             <span className="delete-span" onClick={() => onDelete(history.id)}>
                                    Usuń
                            </span>
                        </Col>
                    </Row>
                </Row>
            ))}
        </div>
    );
};

export default ServiceHistoryList;
