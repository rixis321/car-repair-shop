import React, {useState} from 'react';
import {useContext, useEffect} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate, useParams} from "react-router";
import {Navigate} from "react-router-dom";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import "./cars-add-styles.css"
import api from "../../api/axiosConfig.js";

const CarsAdd = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    useEffect(() => {
    }, [auth.accessToken]);
    const [carData, setCarData] = useState({
        brand: "",
        model: "",
        registrationNumber: "",
        type: "",
        productionYear: "",
        gearboxType: "",
        fuelType: "",
        engine: "",
        vinNumber: ""
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");



    //todo
    const validateRegistrationNumber = (name) => {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name);
    };

    const validateVinNumber = (city) => {
        const cityRegex = /^[A-Za-z]+$/;
        return cityRegex.test(city);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setCarData(prevData => ({
                ...prevData,
                [name]: value
            }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdzanie poprawności danych przed wysłaniem
        const validationErrors = {};


        if (!validateRegistrationNumber(carData.registrationNumber)) {
            validationErrors.name = "Wprowadź poprawne imię";
        }

        if (!validateVinNumber(carData.vinNumber)) {
            validationErrors.lastname = "Wprowadź poprawne nazwisko";
        }

        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.post(
                "/cars",
                JSON.stringify({
                    brand: carData.brand,
                    model: carData.model,
                    registrationNumber: carData.registrationNumber,
                    type: carData.type,
                    carInfoDto: {
                        productionYear: carData.productionYear,
                        gearboxType: carData.gearboxType,
                        fuelType: carData.fuelType,
                        engine: carData.engine,
                        vinNumber: carData.vinNumber
                    }
                }),{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                })
            if(response.status === 201){
                setAlertVariant("success");
                setAlertMessage("Rejestracja samochodu zakończona sukcesem!");
                setShowAlert(true);
                navigate("/cars")
                return;
            }
        }catch (err){
            console.log(err)
            setAlertVariant("danger");
            setAlertMessage(err.response.data.message);
            setShowAlert(true);
        }
    };
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
                        <h2>Rejestracja klienta</h2>
                        <Container fluid>
                            {/* Show Alert */}
                            {showAlert && (
                                <Alert
                                    variant={alertVariant}
                                    onClose={() => setShowAlert(false)}
                                    dismissible
                                >
                                    {alertMessage}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        {/* Input dla telefonu */}
                                        <Form.Group controlId="name">
                                            <Form.Label className="custom-label">Marka auta</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź imię"
                                                name="name"
                                                value={carData.brand}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.name && <small className="text-danger">{errors.name}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla telefonu */}
                                        <Form.Group controlId="lastname">
                                            <Form.Label className="custom-label">Model auta</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź nazwisko"
                                                name="lastname"
                                                value={carData.lastname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla telefonu */}
                                        <Form.Group controlId="phone">
                                            <Form.Label className="custom-label">Numer telefonu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź numer telefonu"
                                                name="phone"
                                                value={carData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* Pozostałe inputy w trzech kolumnach */}
                                <Row className={"justify-content-center align-items-center"} >
                                    <h3 className="text-center mb-4 mt-4">Dane adresowe</h3>
                                    <Col md={3}>
                                        {/* Input dla kodu pocztowego */}
                                        <Form.Group controlId="zipcode">
                                            <Form.Label className="custom-label">Kod pocztowy</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź kod pocztowy"
                                                name="zipcode"
                                                value={carData.zipcode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.zipcode && <small className="text-danger">{errors.zipcode}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla miasta */}
                                        <Form.Group controlId="city">
                                            <Form.Label className="custom-label">Miasto</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź miasto"
                                                name="city"
                                                value={carData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.city && <small className="text-danger">{errors.city}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        {/* Input dla nazwy ulicy */}
                                        <Form.Group controlId="streetName">
                                            <Form.Label className="custom-label">Nazwa ulicy</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź nazwę ulicy"
                                                name="streetName"
                                                value={carData.streetName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.streetName && <small className="text-danger">{errors.streetName}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla numeru ulicy */}
                                        <Form.Group controlId="streetNumber">
                                            <Form.Label className="custom-label">Numer ulicy</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź numer ulicy"
                                                name="streetNumber"
                                                value={carData.streetNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.streetNumber && <small className="text-danger">{errors.streetNumber}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Przycisk do wysłania formularza */}
                                <Button variant="primary" type="submit">
                                    Zarejestruj samochod
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarsAdd;