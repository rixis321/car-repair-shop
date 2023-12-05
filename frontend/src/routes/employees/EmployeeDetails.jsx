import React, {useState} from 'react';
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, ListGroup, Row, Spinner} from "react-bootstrap";
import api from "../../api/axiosConfig.js";
import {useContext, useEffect} from "react"
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate, useParams} from "react-router";
import "./employee-details.css"
import dateFormat from "../../utils/DateFormat.jsx";
import ListItem from "../../components/Utils/ListItem.jsx";


const EmployeeDetails = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();
    const { id } = useParams();

    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/employees/${id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setEmployeeData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
    }, [auth.accessToken]);
    console.log(employeeData)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dane szczegółowe pracownika</h2>
                        <Container fluid>
                            <div className="row mb-1">
                                <div className="col-md-6 personal-data">
                                    <h3>Dane osobowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                    <ul className="custom-list personal-data">
                                        <li><strong>Imię</strong> {employeeData.name}</li>
                                        <li><strong>Nazwisko</strong> {employeeData.lastname}</li>
                                        <li><strong>Nr. telefonu</strong>{employeeData.phone}</li>
                                        <li><strong>Email</strong> {employeeData.email}</li>
                                        <li><strong>Hasło</strong>********</li>
                                    </ul>
                                    )}
                                </div>
                                <div className="col-md-6 address-data">
                                    <h3>Dane adresowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                    <ul className="custom-list address-data">

                                        <li><strong>Kod pocztowy</strong>{employeeData.userAddressDto.zipcode}</li>
                                        <li><strong>Miasto</strong>{employeeData.userAddressDto.city}</li>
                                        <li><strong>Nazwa ulicy</strong>{employeeData.userAddressDto.streetName}</li>
                                        <li><strong>Numer ulicy </strong> {employeeData.userAddressDto.streetNumber}</li>
                                    </ul>
                                            )}
                                </div>
                            </div>
                            <Row className={"mt-0"}>
                                <div className="d-flex mb-3 option-buttons">
                                    <Col md={1} className="mb-1">
                                        <Button block>Edytuj dane pracownika</Button>
                                    </Col>
                                    <Col md={3} className="mb-3">
                                        <Button block>Zresetuj hasło</Button>
                                    </Col>
                                </div>
                            </Row>
                        </Container>
                        <h2>Przeprowadzone diagnozy</h2>
                        <Container fluid>
                            {employeeData?.diagnoses && employeeData.diagnoses.length > 0 ? (
                            <ListItem
                                items={employeeData?.diagnoses || []}
                                template={(diagnosis) => (
                                    <>
                                        <strong>Opis:</strong> {diagnosis.description}<br />
                                        <strong>Szacowany koszt:</strong> {diagnosis.estimatedCost}<br />
                                        <strong>Data:</strong> {new Date(diagnosis.diagnosisDate).toLocaleString()}<br />
                                    </>
                                )}
                                loading={loading}
                                detailsLinkPath="/diagnosis/:id"
                                itemsPerPage={4}
                            />
                                ):(
                                <Alert variant="info">Brak postawionych diagnoz.</Alert>
                            )}
                        </Container>
                        <h2>Przeprowadzone prace serwisowe</h2>
                        <Container fluid>
                            {employeeData?.services && employeeData.services.length > 0 ? (
                            <ListItem
                                items={employeeData?.services?.flatMap((service) => service.serviceHistory) || []}
                                template={(historyEntry) => (
                                    <>
                                        <strong>Data:</strong> {new Date(historyEntry.date).toLocaleString()}<br />
                                        <strong>Opis:</strong> {historyEntry.description}<br />
                                    </>
                                )}
                                loading={loading}
                                detailsLinkPath="/services/:id"
                                itemsPerPage={4}
                                />
                                ):(
                                <Alert variant="info">Brak aktualnie przeprowadzonych prac.</Alert>
                                )}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetails;