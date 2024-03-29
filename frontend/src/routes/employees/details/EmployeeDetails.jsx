import React, {useState} from 'react';
import AdminNavbar from "../../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import {Alert, Button, Col, Container, ListGroup, Modal, Row, Spinner} from "react-bootstrap";
import api from "../../../api/axiosConfig.js";
import {useContext, useEffect} from "react"
import AuthContext from "../../../security/AuthProvider.jsx";
import {Navigate, useNavigate, useParams} from "react-router";
import "./employee-details.css"
import dateFormat from "../../../utils/DateFormat.jsx";
import ListItem from "../../../components/Utils/ListItem.jsx";
import PasswordResetForm from "../../../components/employee/PasswordResetForm.jsx";
import EmployeeEditForm from "../../../components/employee/EmployeeEditForm.jsx";
import RoleForm from "../../../components/employee/RoleForm.jsx";
import RoleChangeModal from "../../../components/employee/modal/RoleChangeModal.jsx";
import EmployeeEditModal from "../../../components/employee/modal/EmployeeEditModal.jsx";
import PasswordResetModal from "../../../components/employee/modal/PasswordResetModal.jsx";


const EmployeeDetails = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const handleEditButtonClick = () => {
        setShowEditModal(!showEditModal);
    };
    const handleRoleChangeButtonClick = () => {
        setShowChangeRoleModal(!showChangeRoleModal);
    };
    const handleEditButtonOnSave= (updatedData) => {
        setEmployeeData(updatedData);
        handleEditButtonClick()
    };
    const handleRoleChangeSave = (updatedData) => {
        setEmployeeData(updatedData)
        handleRoleChangeButtonClick()
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/employees/${id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setEmployeeData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
    }, [auth.accessToken]);

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
                        <h2>Dane szczegółowe pracownika</h2>
                        <Container fluid>
                            <div className="row mb-1">
                                <div className="col-md-6 personal-data">
                                    <h3>Dane osobowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                    <ul className="custom-list personal-data">
                                        <li><strong>Imię</strong> {employeeData.name}</li>
                                        <li><strong>Nazwisko</strong> {employeeData.lastname}</li>
                                        <li><strong>Nr. telefonu</strong>{employeeData.phone}</li>
                                        <li><strong>Email</strong> {employeeData.email}</li>
                                        <li><strong>Hasło</strong>********</li>
                                        <li><strong>Rola</strong>{employeeData.roles[0].name}</li>
                                    </ul>
                                    )}
                                </div>
                                <div className="col-md-6 address-data">
                                    <h3>Dane adresowe</h3>
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                    <ul className="custom-list address-data">

                                        <li><strong>Kod pocztowy</strong>{employeeData.userAddressDto.zipcode}</li>
                                        <li><strong>Miasto</strong>{employeeData.userAddressDto.city}</li>
                                        <li><strong>Nazwa ulicy</strong>{employeeData.userAddressDto.streetName}</li>
                                        <li><strong>Numer ulicy </strong> {employeeData.userAddressDto.streetNumber}</li>
                                    </ul>
                                            )}
                                </div>
                            </div>
                            <Row className={"mt-0"}>
                                <div className="d-flex mb-3 option-buttons">
                                    <Col  className="mb-1">
                                        <Button block onClick={handleEditButtonClick}>Edytuj dane pracownika</Button>
                                    </Col>
                                    <Col  className="mb-3">
                                        <Button block onClick={() => setShowPasswordResetModal(true)}>Zresetuj hasło</Button>
                                    </Col>
                                    <Col  className="mb-3" onClick={handleRoleChangeButtonClick}>
                                        <Button block>Zmień uprawnienia</Button>

                                    </Col>
                                    <RoleChangeModal
                                        show={showChangeRoleModal}
                                        handleClose={() => setShowChangeRoleModal(false)}
                                        employeeId={id}
                                        initialData={employeeData}
                                        onSave={handleRoleChangeSave}
                                        onCancel={() => setShowChangeRoleModal(false)}
                                    />
                                    <EmployeeEditModal
                                        show={showEditModal}
                                        handleClose={() => setShowEditModal(false)}
                                        employeeId={id}
                                        initialData={employeeData}
                                        onSave={handleEditButtonOnSave}
                                        onCancel={handleEditButtonClick}
                                    />
                                    <PasswordResetModal
                                        show={showPasswordResetModal}
                                        handleClose={() => setShowPasswordResetModal(false)}
                                        employeeId={id}
                                        onCancel={() => setShowPasswordResetModal(false)}
                                        onPasswordReset={(newPassword) => {
                                            console.log('Password reset:', newPassword);
                                            setShowPasswordResetModal(false);
                                        }}
                                    />
                                </div>
                            </Row>
                        </Container>
                        <h2>Przeprowadzone diagnozy</h2>
                        <Container fluid>
                            {employeeData?.diagnoses && employeeData.diagnoses.length > 0 ? (
                            <ListItem
                                items={employeeData?.diagnoses || []}
                                template={(diagnosis) => (
                                    <>
                                        <strong>Opis:</strong> {diagnosis.description}<br />
                                        <strong>Szacowany koszt:</strong> {diagnosis.estimatedCost + "zł"}<br />
                                        <strong>Data:</strong> {new Date(diagnosis.diagnosisDate).toLocaleString()}<br />
                                    </>
                                )}
                                loading={loading}
                                detailsLinkBuilder={(diagnosis) => `/diagnosis/${diagnosis.id}`}
                                itemsPerPage={4}
                            />
                                ):(
                                <Alert className={"alert-info"} variant="info">Brak postawionych diagnoz.</Alert>
                            )}
                        </Container>
                        <h2>Przeprowadzone prace serwisowe</h2>
                        <Container fluid>
                            {employeeData?.serviceHistory && employeeData.serviceHistory.length > 0 ? (
                            <ListItem
                                items={employeeData?.serviceHistory || []}
                                template={(history) => (
                                    <>
                                        <strong>Data:</strong> {dateFormat(history.date)}<br />
                                        <strong>Opis:</strong> {history.description}<br />
                                    </>
                                )}
                                loading={loading}
                                detailsLinkBuilder={(history) => `/services/${history.serviceId}`}
                                itemsPerPage={4}
                                />
                                ):(
                                <Alert className={"alert-info"} variant="info">Brak aktualnie przeprowadzonych prac.</Alert>
                                )}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetails;