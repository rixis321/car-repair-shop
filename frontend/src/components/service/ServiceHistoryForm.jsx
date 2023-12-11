import React from 'react';
import {useContext, useState} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import api from "../../api/axiosConfig.js";
import {jwtDecode} from "jwt-decode";

const ServiceHistoryForm = ({serviceId, initialData, onSave, onCancel}) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const {auth} = useContext(AuthContext);
    const [responseError, setResponseError] = useState('')
    const [description,setDescription] = useState("")

    const token = jwtDecode(auth.accessToken)

    const handleSave = async () =>{
        const validationErrors = {};

        if (!description.trim()) {
            validationErrors.description = 'Opis serwisu nie może być pusty.';
        }
        // Jeśli są błędy walidacyjne, nie wysyłaj danych
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            console.log("DATA PRZED ZMIANA ", formData)
            const response = await api.post(`/employees/${token.id}/services/${serviceId}/history`, JSON.stringify({
                description: description,
            }), {
                headers: {"Content-Type": "Application/json", "Authorization": auth.accessToken}
            })
            if (response.status !== 201) {
                return;
            }
            await api.get(`/services/${serviceId}`, {
                headers: {"Content-Type": "application/json", "Authorization": auth.accessToken}
            }).then(updatedServiceData => {
                setFormData(prevData => ({ ...prevData, ...updatedServiceData.data }));
                console.log("DATA PO ZMIANIE ", formData);
                onSave(updatedServiceData.data);
            });

            setFormData(updatedServiceData.data)
            console.log("DATA PO ZMIANIE ", formData)
            onSave(formData)
        } catch (err) {
            console.log("TUTAJ JEST ERROR")
            console.log(err)
            if (err.response && err.response.data) {
                setResponseError(err.response.data.message);
            }
        }
    }

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        if (name === 'description') {
            setDescription(value);
        }
    }
    console.log("TO SIE PRINTUJE")
    console.log(formData)
    return (
        <Form>
            <Row>
                    <Form.Group controlId="description">
                        <Form.Label>Opis pracy serwisowej</Form.Label>
                        <Form.Control
                            type="text"
                            as={"textarea"}
                            rows={6}
                            placeholder="Wprowadź opis serwisu"
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {errors.description && <small className="text-danger">{errors.description}</small>}

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

export default ServiceHistoryForm;