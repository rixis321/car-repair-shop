import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router';
import {Button, Col, Collapse, Container, Row} from 'react-bootstrap';
import Navbar from '../../../components/static/navbar/Navbar.jsx';
import Hero from '../../../components/static/home/Hero.jsx';
import './client-details.css';
import axios from 'axios';

const ClientDetails = () => {
    const navigate = useNavigate();
    const accessCode = sessionStorage.getItem('accessCode');

    const [clientDataState, setClientDataState] = useState(null);
    const [expandedServiceHistory, setExpandedServiceHistory] = useState(false);

    useEffect(() => {
        if (accessCode === null) {
            navigate('/');
        }
    }, [accessCode, navigate]);


    useEffect(() => {
        fetchData()
    }, []);

    const toggleServiceHistory = () => {
        setExpandedServiceHistory(!expandedServiceHistory);
    };

    const handleRejectDiagnosis = async (diagnosisId) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/client/diagnosis/${diagnosisId}/status?status=ODRZUCONO&accessCode=${accessCode}`,
                null,
                {
                    headers: {'Content-Type': 'Application/json'},
                }

            );
            if(response.status === 200){
                await fetchData()
            }
        } catch (err) {
            console.error(err);
        }
    };
    const fetchData = async () =>{
        try{
            const response = await axios.get(
                `http://localhost:8080/client/customers/access?accessCode=${accessCode}`,
                {
                    headers: { "Content-Type": "Application/json" }
                }
            )
            setClientDataState(response.data)
        }catch (err){
            console.log(err)
        }

    }
    const handleAcceptDiagnosis = async (diagnosisId) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/client/diagnosis/${diagnosisId}/status?status=ZATWIERDZONO&accessCode=${accessCode}`,
                null,
                {
                    headers: { 'Content-Type': 'Application/json' },
                }
            );
            if(response.status === 200){
                await fetchData()
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />
            <Hero cName="hero" title="Nasz warsztat. Twój samochód" text="Profesjonalne podejście i zadowolenie klienta" url="/" />
            <div className={'info'}>
                <Container className="content-wrapper client-info">
                    <Row>
                        <Col>
                            <h2>Diagnozy wymagające ingerencji</h2>
                            {clientDataState && clientDataState.diagnosis && clientDataState.diagnosis.length > 0 ? (
                                clientDataState.diagnosis.map((diagnosis) => (
                                    <div key={diagnosis.id} className="mb-3">
                                        <p>
                                            <strong>Opis diagnozy:</strong> {diagnosis.description}
                                        </p>
                                        <p>
                                            <strong>Status :</strong> {diagnosis.clientApproval}
                                        </p>
                                        <p>
                                            <strong>Data diagnozy:</strong>{' '}
                                            {new Date(diagnosis.diagnosisDate).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Szacunkowy koszt naprawy:</strong> {diagnosis.estimatedCost + ' zł'}
                                        </p>
                                        <Button variant="danger" onClick={() => handleRejectDiagnosis(diagnosis.id)} className="me-2">
                                            Odrzuć
                                        </Button>
                                        <Button variant="success" onClick={() => handleAcceptDiagnosis(diagnosis.id)}>Zaakceptuj</Button>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p>Brak diagnoz do zatwierdzenia.</p>
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h2>Serwisy</h2>
                            {clientDataState && clientDataState.services && clientDataState.services.length > 0 ? (
                                clientDataState.services.map((service) => (
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
                                        <Button variant="primary" className={"mb-4"} onClick={toggleServiceHistory}>Historia serwisu</Button>
                                        <Collapse in={expandedServiceHistory}>
                                            <div className="mt-3 ">
                                                <ul className="list-group history-info">
                                                    {service.serviceHistory && service.serviceHistory.length > 0 ? (
                                                        service.serviceHistory.map((historyItem) => (
                                                            <li key={historyItem.id} className="list-group-item">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <strong>Opis:</strong> {historyItem.description}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Data:</strong> {new Date(historyItem.date).toLocaleString()}
                                                                    </div>

                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="list-group-item">Brak historii serwisu.</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </Collapse>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p>Brak przeprowadzanych serwisów.</p>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ClientDetails;
