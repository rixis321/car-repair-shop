import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ title, iconName, number }) => {
    return (
        <Card>
            <Card.Body className="d-flex align-items-start justify-content-center">
                <div className="d-flex flex-column align-items-center">
                    <Card.Title className="card-title titleEmp">{title}</Card.Title>
                    <div className="d-flex align-items-center icon-number">
                        <i className={`bi ${iconName} icon`}></i>
                        <span className="card-number">{number}</span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DashboardCard;