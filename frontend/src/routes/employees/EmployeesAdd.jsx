import React, {useState} from 'react';
import {useContext, useEffect} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate, useParams} from "react-router";
import {Navigate} from "react-router-dom";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import "./employees-add-styles.css"
import api from "../../api/axiosConfig.js";

const EmployeesAdd = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();
    const { id } = useParams();

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    useEffect(() => {
    }, [auth.accessToken]);
    const [employeeData, setEmployeeData] = useState({
        name: "",
        lastname: "",
        phone: "",
        role: "RECEPCJONISTA",
        email: "",
        password: "",
        city: "",
        zipcode: "",
        streetNumber: "",
        streetName: ""
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const validateEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name);
    };

    const validateCity = (city) => {
        const cityRegex = /^[A-Za-z]+$/;
        return cityRegex.test(city);
    };

    const validatePassword = (password) => {

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d{3,}).*$/;
        return passwordRegex.test(password);
    };

    const validateStreetName = (streetName) => {

        const streetNameRegex = /^[A-Za-z]+$/;
        return streetNameRegex.test(streetName);
    };

    const validateStreetNumber = (streetNumber) => {

        const streetNumberRegex = /^\d+$/;
        return streetNumberRegex.test(streetNumber);
    };

    const validateZipCode = (zipCode) => {

        const zipCodeRegex = /^\d{2}-?\d{3}$/;
        return zipCodeRegex.test(zipCode);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone" && value.length <= 9) {
            setEmployeeData(prevData => ({
                ...prevData,
                [name]: value.replace(/\D/g, "")
            }));

        }else{
            setEmployeeData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdzanie poprawności danych przed wysłaniem
        const validationErrors = {};
        if (!validateEmail(employeeData.email)) {
            validationErrors.email = "Wprowadź poprawny adres email";
        }

        if (!validateName(employeeData.name)) {
            validationErrors.name = "Wprowadź poprawne imię";
        }

        if (!validateName(employeeData.lastname)) {
            validationErrors.lastname = "Wprowadź poprawne nazwisko";
        }

        if (!validateCity(employeeData.city)) {
            validationErrors.city = "Wprowadź poprawne miasto";
        }

        if (!validatePassword(employeeData.password)) {
            validationErrors.password = "Co najmniej jedna duża litera i trzy cyfry";
        }

        if (!validateStreetName(employeeData.streetName)) {
            validationErrors.streetName = "Wprowadź poprawną nazwę ulicy";
        }

        if (!validateStreetNumber(employeeData.streetNumber)) {
            validationErrors.streetNumber = "Wprowadź poprawny numer ulicy";
        }

        if (!validateZipCode(employeeData.zipcode)) {
            validationErrors.zipcode = "Wprowadź poprawny kod pocztowy";
        }
        if (!validatePhone(employeeData.phone)) {
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
                "/auth/register",
                JSON.stringify({
                    name: employeeData.name,
                    lastname: employeeData.lastname,
                    phone: employeeData.phone,
                    role: employeeData.role,
                    email: employeeData.email,
                    password: employeeData.password,
                    userAddressDto: {
                        city: employeeData.city,
                        zipcode: employeeData.zipcode,
                        streetNumber: employeeData.streetNumber,
                        streetName: employeeData.streetName
                    }
                }),{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                })
            if(response.status === 201){
                setAlertVariant("success");
                setAlertMessage("Rejestracja pracownika zakończona sukcesem!");
                setShowAlert(true);
                navigate("/employees")
                return;
            }
            }catch (err){
            console.log(err)
            setAlertVariant("danger");
            setAlertMessage(err.response.data.message);
            setShowAlert(true);
        }
    };
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
                        <h2>Rejestracja pracownika</h2>
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
                                    <h3 className="text-center mb-4 mt-4">Dane logowania</h3>
                                    <Col md={3}>
                                        {/* Input dla emailu */}
                                        <Form.Group controlId="email">
                                            <Form.Label className="custom-label">Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź email"
                                                name="email"
                                                value={employeeData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.email && <small className="text-danger">{errors.email}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla hasla */}
                                        <Form.Group controlId="password">
                                            <Form.Label className="custom-label">Hasło</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Wprowadź hasło"
                                                name="password"
                                                value={employeeData.password}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.password && <small className="text-danger">{errors.password}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
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
                                                value={employeeData.name}
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
                                                value={employeeData.lastname}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        {/* Input dla telefonu */}
                                        <Form.Group controlId="phone">
                                            <Form.Label className="custom-label">Numer telefonu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź numer telefonu"
                                                name="phone"
                                                value={employeeData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        {/* Input dla roli z dropdownem */}
                                        <Form.Group controlId="role">
                                            <Form.Label className="custom-label">Rola</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="role"
                                                className={"custom-dropdown"}
                                                value={employeeData.role}
                                                onChange={handleInputChange}
                                            >
                                                <option value="RECEPCJONISTA">Recepcjonista</option>
                                                <option value="MECHANIK">Mechanik</option>
                                            </Form.Control>
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
                                                value={employeeData.zipcode}
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
                                                value={employeeData.city}
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
                                                value={employeeData.streetName}
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
                                                value={employeeData.streetNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.streetNumber && <small className="text-danger">{errors.streetNumber}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Przycisk do wysłania formularza */}
                                <Button variant="primary" type="submit">
                                    Zarejestruj pracownika
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeesAdd;