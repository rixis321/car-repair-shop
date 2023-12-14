import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router";
import Navbar from "../../../components/static/navbar/Navbar.jsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import Hero from "../../../components/static/home/Hero.jsx";
import "./client-details.css"
const ClientDetails = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('accessCode') === null) {
            navigate('/');
        }
    }, [navigate]);
    const location = useLocation();
    const { clientData } = location.state;
    console.log(clientData)
    return (
        <>
                <Navbar/>
                <Hero
                    cName="hero"
                    title="Nasz warsztat. Twój samochód"
                    text="Profesjonalne podejście i zadowolenie klienta"
                    url="/"
                />
            <div className={"info"}>
                <Container className="content-wrapper client-info">
                    <Row>
                        <Col>
                            <h2>Diagnozy wymagające ingerencji</h2>
                            {clientData.diagnosis &&
                                clientData.diagnosis.map((diagnosis) => (
                                    <div key={diagnosis.id} className="mb-3">
                                        <p>
                                            <strong>Opis diagnozy:</strong> {diagnosis.description}
                                        </p>
                                        <p>
                                            <strong>Status klienta:</strong> {diagnosis.clientApproval}
                                        </p>
                                        <p>
                                            <strong>Data diagnozy:</strong> {new Date(diagnosis.diagnosisDate).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Koszt szacunkowy:</strong> {diagnosis.estimatedCost + " zł"}
                                        </p>
                                        <Button variant="danger" className="me-2">
                                            Odrzuć
                                        </Button>
                                        <Button variant="success">Zaakceptuj</Button>
                                        <hr />
                                    </div>
                                ))}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h2>Serwisy</h2>
                            {clientData.services &&
                                clientData.services.map((service) => (
                                    <div key={service.id} className="mb-3">
                                        <p>
                                            <strong>Opis pracy serwisowej:</strong> {service.description}
                                        </p>
                                        <p>
                                            <strong>Koszt [PLN]:</strong> {service.cost}
                                        </p>
                                        <p>
                                            <strong>Status serwisu:</strong> {service.serviceStatus}
                                        </p>
                                        <Button variant="primary">Historia serwisu</Button>
                                        <hr />
                                    </div>
                                ))}
                        </Col>
                    </Row>
                </Container>
            </div>

        </>

    );
};

export default ClientDetails;