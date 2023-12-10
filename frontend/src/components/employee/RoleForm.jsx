// Import necessary components and hooks
import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import {useContext} from "react";
import api from "../../api/axiosConfig.js";
import AuthContext from "../../security/AuthProvider.jsx";

const ChangeRoleForm = ({ onSave, onCancel,employeeId,initialData }) => {
    const [selectedRole, setSelectedRole] = useState();
    const { auth } = useContext(AuthContext);
    const [responseError,setResponseError] = useState('')

    useEffect(() => {
        if (initialData && initialData.roles && initialData.roles.length > 0) {
            setSelectedRole(initialData.roles[0].name);
        }
    }, [initialData]);
    const handleRoleChange = async () => {
        try {
            const response = await api.put(`/employees/${employeeId}/role`,selectedRole,{
                headers: {"Content-Type": "Application/json", "Authorization": auth.accessToken}
            })

            if (response.status !== 200) {
                return;
            }
            const updatedEmployeeResponse = await api.get(`/employees/${employeeId}`, {
                headers: { 'Content-Type': 'Application/json', Authorization: auth.accessToken },
            });

            setResponseError('');
            onSave(updatedEmployeeResponse.data);
        }catch (err){
            if (err.response && err.response.data) {
                setResponseError(err.response.data.message);
            } else {
                setResponseError('Wystąpił błąd podczas zmiany uprawnień.');
            }
        }


    };

    console.log(selectedRole)
    return (
        <>
            <Form>
                <Form.Group controlId="formNewRole">
                    <Form.Label>Rola</Form.Label>
                    <Form.Control
                        as="select"
                        name="role"
                        className="custom-dropdown"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="RECEPCJONISTA">Recepcjonista</option>
                        <option value="MECHANIK">Mechanik</option>
                    </Form.Control>
                    {responseError && <Alert className={"mt-2"} variant="danger">{responseError}</Alert>}
                </Form.Group>
                <Row className="mt-3">
                    <Col>
                        <Button variant="primary" onClick={onCancel}>
                            Anuluj
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={handleRoleChange}>
                            Zresetuj hasło
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>
    );
};

export default ChangeRoleForm;
