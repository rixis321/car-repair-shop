import React, {useEffect} from 'react';
import {useContext, useState} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import CarBrands from "../CarBrands.jsx";
import api from "../../../api/axiosConfig.js";
import {validateRegistrationNumber, validateVinNumber} from "../../../utils/CarValidation.jsx";

const CarEditForm = ({carId,initialData,onSave,onCancel}) => {

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const { auth } = useContext(AuthContext);
    const [responseError,setResponseError] = useState('')

    useEffect(() => {
        console.log("carInfoDto updated:", formData.carInfoDto);
    }, [formData.carInfoDto]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Input changed - Name:", name, "Value:", value);
        setFormData((prevData) => {
            if (name.startsWith("carInfoDto.")) {
                const carInfoDto = {
                    ...prevData.carInfoDto,
                    [name.split(".")[1]]: value,
                };

                console.log("Updated carInfoDto:", carInfoDto);

                const updatedState = {
                    ...prevData,
                    carInfoDto,
                };

                console.log("Updated state:", updatedState);

                return updatedState;
            }

            return {
                ...prevData,
                [name]: value,
            };
        });
    };





    const handleSave = async  () => {
        const validationErrors = {};

        if (!validateRegistrationNumber(formData.registrationNumber)) {
            validationErrors.registrationNumber = "Wprowadź poprawny numer rejestracyjny";
        }

        if (!validateVinNumber(formData.carInfoDto.vinNumber)) {
            validationErrors.vinNumber = "Wprowadź poprawny numer VIN";
        }

        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.put(
                `/cars/${carId}`,
                JSON.stringify({
                    brand: formData.brand,
                    model: formData.model,
                    registrationNumber: formData.registrationNumber,
                    type: formData.type,
                    carInfoDto: {
                        productionYear: formData.carInfoDto.productionYear,
                        gearboxType: formData.carInfoDto.gearboxType,
                        fuelType: formData.carInfoDto.fuelType,
                        engine: formData.carInfoDto.engine,
                        vinNumber: formData.carInfoDto.vinNumber
                    }
                }),{
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                })
            console.log(response)
            if (response.status !== 200) {
                return;
            }
            onSave(formData)
        }
        catch (err){
            console.log("TUTAJ JEST ERROR")
            console.log(err)
            if (err.response && err.response.data) {
                setResponseError(err.response.data.message);
            } else {
                setResponseError('Wystąpił błąd podczas edytowania danych.');
            }
        }

    };
    console.log(formData)
    return (
        <Form>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formBrand">
                        <Form.Label>Marka samochodu</Form.Label>
                        <Form.Control
                            as="select"
                            name="brand"
                            className={"custom-dropdown"}
                            value={formData.brand}
                            onChange={handleInputChange}
                        >
                            {CarBrands.map((brand,index)=>(
                                <option key={index} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </Col>
                <Col md={6}>
                    <Form.Group controlId="model">
                        <Form.Label className="custom-label">Model auta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź model auta"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.model && <small className="text-danger">{errors.model}</small>}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="type">
                        <Form.Label>Typ nadowzia</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            className={"custom-dropdown"}
                            value={formData.type}
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
                <Col md={6}>
                    <Form.Group controlId="registrationNumber">
                        <Form.Label>Nr. rejestracyjny</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź numer rejestracyjny"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.registrationNumber && <small className="text-danger">{errors.registrationNumber}</small>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="productionYear">
                        <Form.Label className="custom-label">Rok produkcji</Form.Label>
                        <Form.Control
                            as="select"
                            name="carInfoDto.productionYear"
                            className="custom-dropdown"
                            value={formData.carInfoDto.productionYear}
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
                <Col md={6}>
                    <Form.Group controlId="gearboxType">
                        <Form.Label className="custom-label">Rodzaj skrzyni biegów</Form.Label>
                        <Form.Control
                            as="select"
                            name="carInfoDto.gearboxType"
                            className={"custom-dropdown"}
                            value={formData.carInfoDto.gearboxType}
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

            <Row>

                <Col md={6}>
                    <Form.Group controlId="fuelType">
                        <Form.Label className="custom-label">Rodzaj paliwa</Form.Label>
                        <Form.Control
                            as="select"
                            name="carInfoDto.fuelType"
                            className={"custom-dropdown"}
                            value={formData.carInfoDto.fuelType}
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
                <Col md={6}>
                    <Form.Group controlId="engine">
                        <Form.Label className="custom-label">Pojemność silnika</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź pojemność "
                            name="carInfoDto.engine"
                            value={formData.carInfoDto.engine}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.engine && <small className="text-danger">{errors.engine}</small>}
                    </Form.Group>
                </Col>
            </Row>
            <Row >
                <Col md={6}>
                    <Form.Group controlId="vinNumber">
                        <Form.Label className="custom-label">Numer VIN samochodu</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wprowadź numer VIN"
                            name="carInfoDto.vinNumber"
                            value={formData.carInfoDto.vinNumber}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.vinNumber && <small className="text-danger">{errors.vinNumber}</small>}
                    </Form.Group>
                </Col>
            </Row>
            {responseError && <Alert className={"mt-2"} variant="danger">{responseError}</Alert>}

            <Row className="mt-3">
                <Col>
                    <Button variant="primary" onClick={onCancel}>
                        Anuluj
                    </Button>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleSave}>
                        Zapisz zmiany
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default CarEditForm;