import React from 'react';
import {useContext, useState} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import api from "../../../api/axiosConfig.js";

const DiagnosesEditForm = ({diagnosisId, initialData, onSave, onCancel}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const {auth} = useContext(AuthContext);
    const [responseError, setResponseError] = useState('')

    const handleSave = async () =>{
        const validationErrors = {};

        if (!formData.description.trim()) {
            validationErrors.description = 'Opis diagnozy nie może być pusty.';
        }

        if (!/^\d+(\.\d{1,2})?$/.test(formData.estimatedCost)) {
            validationErrors.estimatedCost = 'Szacowany koszt musi być liczbą.';
        }
        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await api.put(`/diagnosis/${diagnosisId}`, formData, {
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
        if (name === "type") {
            setFormData({ ...formData, clientApproval: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
    console.log(formData)
    return (
        <Form>
            <Row>
                <Col md={8}>
                    <Form.Group controlId="description">
                        <Form.Label>Opis diagnozy</Form.Label>
                        <Form.Control
                            type="text"
                            as={"textarea"}
                            rows={3}
                            placeholder="Wprowadź opis diagnozy"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.description && <small className="text-danger">{errors.description}</small>}
                </Col>
                <Col md={4}>
                    <Form.Group controlId="estimatedCost" className={"mt-4"} >
                        <Form.Label>Szacowany koszt</Form.Label>
                        <Form.Control
                            type="text"
                            name="estimatedCost"
                            value={formData.estimatedCost}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.estimatedCost && <small className="text-danger">{errors.estimatedCost}</small>}
                </Col>
            </Row>
            <Form.Group controlId="estimatedCost" className={"mt-4"} >
                    <Form.Label>Typ nadowzia</Form.Label>
                    <Form.Control
                        as="select"
                        name="type"
                        className={"custom-dropdown"}
                        value={formData.clientApproval}
                        onChange={handleInputChange}
                    >
                        <option value="OCZEKUJE">OCZEKUJE</option>
                        <option value="ZATWIERDZONO">ZATWIERDZONO</option>

                    </Form.Control>
                </Form.Group>
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

export default DiagnosesEditForm;