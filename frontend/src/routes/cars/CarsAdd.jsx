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
import CarBrands from "../../components/car/CarBrands.jsx";
import {validateRegistrationNumber, validateVinNumber} from "../../utils/CarValidation.jsx";

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
        brand: "AUDI",
        model: "",
        registrationNumber: "",
        type: "SEDAN",
        productionYear: "2023",
        gearboxType: "MANUALNA",
        fuelType: "BENZYNA",
        engine: "",
        vinNumber: ""
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [customerData,setCustomerData] = useState();
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await api.get('/customers',{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setCustomerData(response.data);
            } catch (error) {
                setAlertMessage(error.message);
                setAlertVariant("danger");
                setShowAlert(true)
            }

        }
        fetchData();
    },[])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setCarData(prevData => ({
                ...prevData,
                [name]: value
            }));
    };

    const handleCustomerSelect = (customerId) => {
        setSelectedCustomerId(customerId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdzanie poprawności danych przed wysłaniem
        const validationErrors = {};

        if (!validateRegistrationNumber(carData.registrationNumber)) {
            validationErrors.registrationNumber = "Wprowadź poprawny numer rejestracyjny";
        }

        if (!validateVinNumber(carData.vinNumber)) {
            validationErrors.vinNumber = "Wprowadź poprawny numer VIN";
        }
        if (!selectedCustomerId) {
            validationErrors.customer = 'Wybierz klienta';
        }

        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.post(
                `${selectedCustomerId}/cars`,
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
    console.log(errors)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Rejestracja pojazdu</h2>
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
                            <h3>Wybierz klienta dla którego chcesz dodać samochód</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="customer-container">
                                    {customerData && customerData.map((customer) => (
                                        <Row md={2} key={customer.id} className={"justify-content-center align-items-center"}>
                                            <Button
                                                variant={selectedCustomerId === customer.id ? 'primary' : 'outline-primary'}
                                                onClick={() => handleCustomerSelect(customer.id)}
                                            >
                                                {`${customer.name} ${customer.lastname} (${customer.phone})`}
                                            </Button>
                                        </Row>
                                    ))}
                                </div>
                            </div>
                            {errors.customer && <small className="text-danger p-3">{errors.customer}</small>}
                            <h3>Dane techniczne pojazdu</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        <Form.Group controlId="brand">
                                            <Form.Label className="custom-label">Marka samochodu</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="brand"
                                                className={"custom-dropdown"}
                                                value={carData.brand}
                                                onChange={handleInputChange}
                                            >
                                                {CarBrands.map((brand,index)=>(
                                                    <option key={index} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>

                                        <Form.Group controlId="model">
                                            <Form.Label className="custom-label">Model auta</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź model auta"
                                                name="model"
                                                value={carData.model}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.model && <small className="text-danger">{errors.model}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        <Form.Group controlId="type">
                                            <Form.Label className="custom-label">Rodzaj nadwozia</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="type"
                                                className={"custom-dropdown"}
                                                value={carData.type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="SEDAN">SEDAN</option>
                                                <option value="KOMBI">KOMBI</option>
                                                <option value="HATCHBACK">HATCHBACK</option>
                                                <option value="MINIVAN">MINIVAN</option>
                                                <option value="SUV">SUV</option>
                                                <option value="KABRIOLET">KABRIOLET</option>
                                                <option value="LIMUZYNA">LIMUZYNA</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="registrationNumber">
                                            <Form.Label className="custom-label">Numer rejestracyjny pojazu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź numer rejestracyjny"
                                                name="registrationNumber"
                                                value={carData.registrationNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.registrationNumber && <small className="text-danger">{errors.registrationNumber}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        <Form.Group controlId="productionYear">
                                            <Form.Label className="custom-label">Rok produkcji</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="productionYear"
                                                className="custom-dropdown"
                                                value={carData.productionYear}
                                                onChange={handleInputChange}
                                            >
                                                {Array.from({ length: 73 }, (_, index) => (
                                                    <option key={index} value={2024 - index}>
                                                        {2024 - index}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="gearboxType">
                                            <Form.Label className="custom-label">Rodzaj skrzyni biegów</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="gearboxType"
                                                className={"custom-dropdown"}
                                                value={carData.gearboxType}
                                                onChange={handleInputChange}
                                            >
                                                <option value="MANUALNA">MANUALNA</option>
                                                <option value="AUTOMATYCZNA">AUTOMATYCZNA</option>
                                                <option value="POLAUTOMATYCZNA">POLAUTOMATYCZNA</option>
                                                <option value="DWUSPRZEGLOWA">DWUSPRZEGLOWA</option>
                                                <option value="DWUSTOPNIOWA">DWUSTOPNIOWA</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={3}>
                                        <Form.Group controlId="fuelType">
                                            <Form.Label className="custom-label">Rodzaj paliwa</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="fuelType"
                                                className={"custom-dropdown"}
                                                value={carData.fuelType}
                                                onChange={handleInputChange}
                                            >
                                                <option value="BENZYNA">BENZYNA</option>
                                                <option value="DIESEL">DIESEL</option>
                                                <option value="LPG">LPG</option>
                                                <option value="ELEKTRYCZNY">ELEKTRYCZNY</option>
                                                <option value="HYBRYDOWY">HYBRYDOWY</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="engine">
                                            <Form.Label className="custom-label">Pojemność silnika</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź pojemność silnika"
                                                name="engine"
                                                value={carData.engine}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.engine && <small className="text-danger">{errors.engine}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={"justify-content-center align-items-center"} >
                                    <Col md={4}>
                                        <Form.Group controlId="vinNumber">
                                            <Form.Label className="custom-label">Numer VIN samochodu</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Wprowadź numer VIN"
                                                name="vinNumber"
                                                value={carData.vinNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {errors.vinNumber && <small className="text-danger">{errors.vinNumber}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
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