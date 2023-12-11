import React from 'react';
import {useContext, useState} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import api from "../../api/axiosConfig.js";

const ServiceEditForm = ({serviceId, initialData, onSave, onCancel}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const {auth} = useContext(AuthContext);
    const [responseError, setResponseError] = useState('')

    const handleSave = async () =>{
        const validationErrors = {};

        if (!formData.description.trim()) {
            validationErrors.description = 'Opis serwisu nie może być pusty.';
        }

        if (!/^\d+(\.\d{1,2})?$/.test(formData.cost)) {
            validationErrors.cost = 'Koszt musi być liczbą.';
        }
        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.put(`/services/${serviceId}`, formData, {
                headers: {"Content-Type": "Application/json", "Authorization": auth.accessToken}
            })
            console.log(response)
            if (response.status !== 200) {
                return;
            }
            onSave(formData)
        } catch (err) {
            console.log("TUTAJ JEST ERROR")
            console.log(err)
            if (err.response && err.response.data) {
                setResponseError(err.response.data.message);
            } else {
                setResponseError('Wystąpił błąd podczas edytowania danych.');
            }
        }
    }

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }
    console.log(formData)
    return (
        <Form>
            <Row>
                <Col md={8}>
                    <Form.Group controlId="description">
                        <Form.Label>Opis pracy serwisowej</Form.Label>
                        <Form.Control
                            type="text"
                            as={"textarea"}
                            rows={6}
                            placeholder="Wprowadź opis serwisu"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.description && <small className="text-danger">{errors.description}</small>}
                </Col>
                <Col md={4}>
                    <Form.Group controlId="cost" className={"mt-5"} >
                        <Form.Label>Koszt pracy</Form.Label>
                        <Form.Control
                            type="text"
                            name="cost"
                            value={formData.cost}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.cost && <small className="text-danger">{errors.cost}</small>}
                </Col>
            </Row>
            <Row>
                {responseError && <Alert className={"mt-2"} variant="danger">{responseError}</Alert>}
            </Row>
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

export default ServiceEditForm;