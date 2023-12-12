import React from 'react';
import {useContext, useEffect} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router";
import {useState} from "react";
import api from "../../api/axiosConfig.js";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {jwtDecode} from "jwt-decode";
import DateFormat from "../../utils/DateFormat.jsx";
import "./services-add-styles.css"
const DiagnosesAdd = () => {
    const { auth } = useContext(AuthContext);
    const [diagnosisData,setDiagnosisData] = useState();
    let navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(null);
    const [errors, setErrors] = useState({});
    const [description,setDescription] = useState("")
    const [cost, setCost] = useState('');


    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const token = jwtDecode(auth.accessToken)

    const handleDiagnosisSelect = (diagnosisId) => {
        setSelectedDiagnosisId(diagnosisId);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'description':
                setDescription(value);
                break;
            case 'cost':
                setCost(value);
                break;
            default:
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja pól przed wysłaniem
        const validationErrors = {};

        if (!selectedDiagnosisId) {
            validationErrors.diagnosis = 'Wybierz diagnoze dla której chcesz dodać prace serwisową.';
        }

        if (!description.trim()) {
            validationErrors.description = 'Wprowadź opis serwisu.';
        }

        if (!cost.trim()) {
            validationErrors.cost = 'Wprowadź koszt pracy.';
        } else if (isNaN(Number(cost))) {
            validationErrors.cost = 'Koszt musi być liczbą.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.post(
                `/services/${token.id}/${selectedDiagnosisId}`,
                JSON.stringify({
                    description: description,
                    cost: cost,
                    serviceStatus:"ROZPOCZETO"
                }),{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                })
            if(response.status === 201){
                setAlertVariant("success");
                setAlertMessage("Praca serwisowa dodana pomyślnie!");
                setShowAlert(true);
                navigate("/services")

            }
        }catch (err){
            console.log(err)
            setAlertVariant("danger");
            setAlertMessage(err.response.data.message);
            setShowAlert(true);
        }
    }
    useEffect(() => {
    }, [auth.accessToken]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams({
                    status: 'ZATWIERDZONO'
                })
                const response = await api.get(`/diagnosis/status?${queryParams}`);
                const filteredCarData = response.data.filter(item => item.service === null);
                setDiagnosisData(filteredCarData);
            } catch (error) {
                setAlertMessage(error.message);
                setAlertVariant("danger");
                setShowAlert(true)
            }

        }
        fetchData();
    },[])
    console.log(selectedDiagnosisId)
    console.log(diagnosisData)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dodanie pracy serwisowej</h2>
                        <Container fluid>
                            {showAlert && (
                                <Alert
                                    variant={alertVariant}
                                    onClose={() => setShowAlert(false)}
                                    dismissible
                                >
                                    {alertMessage}
                                </Alert>
                            )}
                            <h3>Wybierz diagnoze dla której chcesz dodac pracę serwisową</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                {diagnosisData && (
                                    <Row md={2} className="justify-content-center align-items-center">
                                        {diagnosisData.map((diagnosis) => (
                                            <Col key={diagnosis.id} md={4} className="mb-3">
                                                <div
                                                    className={`card diagnosis-card ${
                                                        selectedDiagnosisId === diagnosis.id
                                                            ? "border-primary selected"
                                                            : ""
                                                    }`}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDiagnosisSelect(diagnosis.id)}
                                                >
                                                    <div className="card-body">
                                                        <h5 className="card-title">{diagnosis.description}</h5>
                                                        <p className="card-text">
                                                            <strong>Data Diagnozy:</strong>{" "}
                                                            {DateFormat(diagnosis.diagnosisDate)}
                                                        </p>
                                                        <p className="card-text">
                                                            <strong>Samochód:</strong> {diagnosis.car.brand}{" "}
                                                            {diagnosis.car.model}
                                                        </p>
                                                    </div>
                                                </div>

                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </div>
                            {errors.diagnosis && <small className="text-danger p-3">{errors.diagnosis}</small>}
                            <h3 className={"mt-5"}>Dane serwisu</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={6}>
                                        <Form.Group controlId="description">
                                            <Form.Label className="custom-label">Opis pracy serwisowej</Form.Label>
                                            <Form.Control
                                                as={"textarea"}
                                                rows={3}
                                                type="text"
                                                placeholder="Wprowadź opis serwisu"
                                                name="description"
                                                value={description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.description && (
                                                <small className="text-danger">{errors.description}</small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className={""} controlId="cost">
                                            <Form.Label className="custom-label">Koszt serwisu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź koszt"
                                                name="cost"
                                                value={cost}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.cost && <small className="text-danger">{errors.cost}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Dodaj prace serwisową
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiagnosesAdd;