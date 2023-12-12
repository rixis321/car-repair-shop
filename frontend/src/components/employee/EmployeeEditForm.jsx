import React, { useState } from 'react';
import {Form, Button, Col, Row, Alert} from 'react-bootstrap';
import api from "../../api/axiosConfig.js";
import {
    validateName,
    validateCity,
    validateStreetName,
    validateStreetNumber,
    validateZipCode,
    validatePhone,
    validateEmail} from "../../utils/UserValidation.jsx"
import {useContext} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
const EmployeeEditForm = ({ initialData, onSave, onCancel,employeeId,profileMode }) => {

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const { auth } = useContext(AuthContext);
    const [responseError,setResponseError] = useState('')
    const [saveSuccess, setSaveSuccess] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone" && value.length <= 9) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value.replace(/\D/g, "")
            }));
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                userAddressDto: {
                    ...prevData.userAddressDto,
                    [name]: value,
                },
            }));
        }

    };
    const handleSave = async  () => {
        // Sprawdzanie poprawności danych przed wysłaniem
        const validationErrors = {};
        if (!validateEmail(formData.email)) {
            validationErrors.email = "Wprowadź poprawny adres email";
        }

        if (!validateName(formData.name)) {
            validationErrors.name = "Wprowadź poprawne imię";
        }

        if (!validateName(formData.lastname)) {
            validationErrors.lastname = "Wprowadź poprawne nazwisko";
        }

        if (!validateCity(formData.userAddressDto.city)) {
            validationErrors.city = "Wprowadź poprawne miasto";
        }

        if (!validateStreetName(formData.userAddressDto.streetName)) {
            validationErrors.streetName = "Wprowadź poprawną nazwę ulicy";
        }

        if (!validateStreetNumber(formData.userAddressDto.streetNumber)) {
            validationErrors.streetNumber = "Wprowadź poprawny numer ulicy";
        }

        if (!validateZipCode(formData.userAddressDto.zipcode)) {
            validationErrors.zipcode = "Wprowadź poprawny kod pocztowy";
        }
        if (!validatePhone(formData.phone)) {
            validationErrors.phone = "Wprowadz poprawny numer telefonu"
        }

        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.put(`/employees/${employeeId}`,formData,{
                headers: {"Content-Type": "Application/json", "Authorization": auth.accessToken}
            })
            console.log(response)
            if (response.status !== 200) {
                return;
            }
            setSaveSuccess(true);
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
    return (
        <Form>
            {/* Input fields for editing employee data */}
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formName">
                        <Form.Label>Imię</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formLastname">
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.lastname && <small className="text-danger">{errors.lastname}</small>}
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Numer telefonu</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}

                </Col>
                <Col md={6}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formZipcode">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                            type="text"
                            name="zipcode"
                            value={formData.userAddressDto.zipcode}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.zipcode && <small className="text-danger">{errors.zipcode}</small>}
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formCity">
                        <Form.Label>Miasto</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={formData.userAddressDto.city}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.city && <small className="text-danger">{errors.city}</small>}
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formStreetName">
                        <Form.Label>Nazwa ulicy</Form.Label>
                        <Form.Control
                            type="text"
                            name="streetName"
                            value={formData.userAddressDto.streetName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.streetName && <small className="text-danger">{errors.streetName}</small>}
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formStreetNumber">
                        <Form.Label>Numer ulicy</Form.Label>
                        <Form.Control
                            type="text"
                            name="streetNumber"
                            value={formData.userAddressDto.streetNumber}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {errors.streetNumber && <small className="text-danger">{errors.streetNumber}</small>}
                </Col>
            </Row>
            {responseError && <Alert className={"mt-2"} variant="danger">{responseError}</Alert>}

            <Row className="mt-3">
                    {!profileMode && (
                        <>
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
                        </>
                    )}
                    {profileMode && saveSuccess && <Alert className={"mt-2"} variant="success">Zmiany zostały zapisane pomyślnie!</Alert>}
                    {profileMode && (
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" onClick={handleSave}>
                                Zapisz zmiany
                            </Button>
                        </div>
                    )}
            </Row>
        </Form>
    );
};

export default EmployeeEditForm;
