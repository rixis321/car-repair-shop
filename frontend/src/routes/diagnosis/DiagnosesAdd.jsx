import React from 'react';
import {useContext, useEffect} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router";
import {useState} from "react";
import api from "../../api/axiosConfig.js";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import CarBrands from "../../components/car/CarBrands.jsx";
import {jwtDecode} from "jwt-decode";

const DiagnosesAdd = () => {
    const { auth } = useContext(AuthContext);
    const [carData,setCarData] = useState();
    let navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [errors, setErrors] = useState({});
    const [descriptionDiagnosis,setDescriptionDiagnosis] = useState("")
    const [estimatedCost, setEstimatedCost] = useState('');


    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const token = jwtDecode(auth.accessToken)

    const handleCarSelect = (customerId) => {
        setSelectedCarId(customerId);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'descriptionDiagnosis':
                setDescriptionDiagnosis(value);
                break;
            case 'estimatedCost':
                setEstimatedCost(value);
                break;
            default:
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja pól przed wysłaniem
        const validationErrors = {};

        if (!selectedCarId) {
            validationErrors.car = 'Wybierz samochód dla którego chcesz dodać diagnozę.';
        }

        if (!descriptionDiagnosis.trim()) {
            validationErrors.descriptionDiagnosis = 'Wprowadź opis diagnozy.';
        }

        if (!estimatedCost.trim()) {
            validationErrors.estimatedCost = 'Wprowadź szacowany koszt.';
        } else if (isNaN(Number(estimatedCost))) {
            validationErrors.estimatedCost = 'Szacowany koszt musi być liczbą.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.post(
                `/diagnosis`,
                JSON.stringify({
                    carId: selectedCarId,
                    employeeId: token.id,
                    description: descriptionDiagnosis,
                    estimatedCost: estimatedCost,
                }),{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                })
            if(response.status === 201){
                setAlertVariant("success");
                setAlertMessage("Rejestracja samochodu zakończona sukcesem!");
                setShowAlert(true);
                navigate("/diagnosis")

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
                const response = await api.get(`/cars?${queryParams}`);
                setCarData(response.data);
            } catch (error) {
                setAlertMessage(error.message);
                setAlertVariant("danger");
                setShowAlert(true)
            }

        }
        fetchData();
    },[])
    console.log(selectedCarId)
    console.log(carData)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Dodanie diagnozy</h2>
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
                            <h3>Wybierz samochód dla którego chcesz przeprowadzić diagnoze</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="customer-container">
                                    {carData && carData.map((car) => (
                                        <Row md={2} key={car.id} className={"justify-content-center align-items-center"}>
                                            <Button
                                                variant={selectedCarId === car.id ? 'primary' : 'outline-primary'}
                                                onClick={() => handleCarSelect(car.id)}
                                            >
                                                {`${car.brand} ${car.model} (${car.registrationNumber})`}
                                            </Button>
                                        </Row>
                                    ))}
                                </div>
                            </div>
                            {errors.car && <small className="text-danger p-3">{errors.car}</small>}
                            {errors.customer && <small className="text-danger p-3">{errors.customer}</small>}
                            <h3 className={"mt-5"}>Dane diagnozy</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={6}>
                                        <Form.Group controlId="descriptionDiagnosis">
                                            <Form.Label className="custom-label">Opis diagnozy</Form.Label>
                                            <Form.Control
                                                as={"textarea"}
                                                rows={3}
                                                type="text"
                                                placeholder="Wprowadź opis diagnozy"
                                                name="descriptionDiagnosis"
                                                value={descriptionDiagnosis}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.descriptionDiagnosis && (
                                                <small className="text-danger">{errors.descriptionDiagnosis}</small>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className={""} controlId="estimatedCost">
                                            <Form.Label className="custom-label">Szacowany koszt</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź szacowany koszt"
                                                name="estimatedCost"
                                                value={estimatedCost}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.estimatedCost && <small className="text-danger">{errors.estimatedCost}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Dodaj diagnoze
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