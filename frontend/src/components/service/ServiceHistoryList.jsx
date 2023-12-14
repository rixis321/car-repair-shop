import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import DateFormat from "../../utils/DateFormat.jsx";
import {useContext} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {jwtDecode} from "jwt-decode";


const ServiceHistoryList = ({ currentServiceHistory, onDelete }) => {
    const { auth } = useContext(AuthContext);
    const token = jwtDecode(auth.accessToken)
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
                            {token.role === "ADMIN" && (
                                <span className="delete-span" onClick={() => onDelete(history.id)}>
                                    Usuń
                                </span>
                            )}
                        </Col>
                    </Row>
                </Row>
            ))}
        </div>
    );
};

export default ServiceHistoryList;
