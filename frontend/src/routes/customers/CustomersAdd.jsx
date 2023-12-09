import React, {useState} from 'react';
import {useContext, useEffect} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {Navigate, useNavigate, useParams} from "react-router";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import "./customers-add-styles.css"
import api from "../../api/axiosConfig.js";
import {
    validateName,
    validateCity,
    validateStreetName,
    validateStreetNumber,
    validateZipCode,
    validatePhone,} from "../../utils/UserValidation.jsx"
const CustomersAdd = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    useEffect(() => {
    }, [auth.accessToken]);
    const [customerData, setCustomerData] = useState({
        name: "",
        lastname: "",
        phone: "",
        city: "",
        zipcode: "",
        streetNumber: "",
        streetName: ""
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone" && value.length <= 9) {
            setCustomerData(prevData => ({
                ...prevData,
                [name]: value.replace(/\D/g, "")
            }));

        }else{
            setCustomerData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdzanie poprawności danych przed wysłaniem
        const validationErrors = {};


        if (!validateName(customerData.name)) {
            validationErrors.name = "Wprowadź poprawne imię";
        }

        if (!validateName(customerData.lastname)) {
            validationErrors.lastname = "Wprowadź poprawne nazwisko";
        }

        if (!validateCity(customerData.city)) {
            validationErrors.city = "Wprowadź poprawne miasto";
        }


        if (!validateStreetName(customerData.streetName)) {
            validationErrors.streetName = "Wprowadź poprawną nazwę ulicy";
        }

        if (!validateStreetNumber(customerData.streetNumber)) {
            validationErrors.streetNumber = "Wprowadź poprawny numer ulicy";
        }

        if (!validateZipCode(customerData.zipcode)) {
            validationErrors.zipcode = "Wprowadź poprawny kod pocztowy";
        }
        if (!validatePhone(customerData.phone)) {
            setErrors({phone: "Nieprawidłowy numer telefonu"});
            return;
        }
        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.post(
                "/customers",
                JSON.stringify({
                    name: customerData.name,
                    lastname: customerData.lastname,
                    phone: customerData.phone,
                    userAddressDto: {
                        city: customerData.city,
                        zipcode: customerData.zipcode,
                        streetNumber: customerData.streetNumber,
                        streetName: customerData.streetName
                    }
                }),{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                })
            if(response.status === 201){
                setAlertVariant("success");
                setAlertMessage("Rejestracja klienta zakończona sukcesem!");
                setShowAlert(true);
                navigate("/customers")
                return;
            }
        }catch (err){
            console.log(err)
            setAlertVariant("danger");
            setAlertMessage(err.response.data.message);
            setShowAlert(true);
        }
    };
    console.log(customerData)
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
                                    <h3 className="text-center mb-4 mt-4">Dane osobowe</h3>
                                    <Col md={3}>
                                        {/* Input dla telefonu */}
                                        <Form.Group controlId="name">
                                            <Form.Label className="custom-label">Imię</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź imię"
                                                name="name"
                                                value={customerData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.name && <small className="text-danger">{errors.name}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla telefonu */}
                                        <Form.Group controlId="lastname">
                                            <Form.Label className="custom-label">Nazwisko</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź nazwisko"
                                                name="lastname"
                                                value={customerData.lastname}
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
                                                value={customerData.phone}
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
                                                value={customerData.zipcode}
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
                                                value={customerData.city}
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
                                                value={customerData.streetName}
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
                                                value={customerData.streetNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.streetNumber && <small className="text-danger">{errors.streetNumber}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Przycisk do wysłania formularza */}
                                <Button variant="primary" type="submit">
                                    Zarejestruj klienta
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomersAdd;