import React, {useEffect, useRef, useState} from 'react';
import {Form, Button, Col, Alert} from 'react-bootstrap';
import api from "../../../api/axiosConfig.js";
import {useContext} from "react";
import AuthContext from "../../../security/AuthProvider.jsx";
import {Navigate} from "react-router";

const PasswordResetForm = ({ onPasswordReset,employeeId }) => {
    const { auth } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const newPasswordRef = useRef(null);
    useEffect(() => {
        // Check if the ref is not null before using it
        if (newPasswordRef.current) {
            newPasswordRef.current.focus();
        }
    }, []);
    const handlePasswordReset = async () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d.*\d)(?=.*[a-z].*[a-z].*[a-z].*[a-z].*[a-z]).{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setValidationError('Hasło musi składać się z co najmniej 5 liter w tym jedna wielka oraz 3 cyfr.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setValidationError('Podane hasła różnią się od siebie.');
            return;
        }
        try {

            const response = await api.post(`/employees/${employeeId}/reset`,newPassword,{
                headers: {"Content-Type": "Application/json", "Authorization": auth.accessToken}
            } );

            onPasswordReset(newPassword);
        } catch (err) {
            if (err.response && err.response.data) {
                setValidationError(err.response.data.message);
            } else {
                setValidationError('Wystąpił błąd podczas resetowania hasła.');
            }
        }
//

    };

    return (
        <Form>
            <Form.Group controlId="newPassword">
                <Form.Label>Nowe hasło</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Wprowadź nowe hasło"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Powtórz nowe hasło"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ref={newPasswordRef}
                />
            </Form.Group>

            {validationError && <Alert className={"mt-2"} variant="danger">{validationError}</Alert>}

            <Button variant="primary" onClick={handlePasswordReset}>
                Zresetuj hasło
            </Button>
        </Form>
    );
};

export default PasswordResetForm;
