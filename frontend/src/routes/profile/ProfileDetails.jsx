import React, {useState} from 'react';
import {useContext} from "react";
import AuthContext from "../../security/AuthProvider.jsx";
import {Navigate} from "react-router";
import {jwtDecode} from "jwt-decode";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import "./profile-details.css"
import {Card, Col, Row, Spinner} from "react-bootstrap";
import {PersonCircle} from "react-bootstrap-icons";
import ProfileTabs from "../../components/navbar/ProfileTabs.jsx";
import OverviewSection from "../../components/profile/OverviewSection.jsx";
import {useEffect} from "react";
import api from "../../api/axiosConfig.js";
import EmployeeEditForm from "../../components/employee/EmployeeEditForm.jsx";
import PasswordResetForm from "../../components/employee/PasswordResetForm.jsx";

const ProfileDetails = () => {
    const { auth } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState('overview')
    const [profileData,setProfileData] = useState(null)
    const [loading, setLoading] = useState(true);



    const handleEditButtonOnSave= (updatedData) => {
        setProfileData(updatedData);
    };

    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    useEffect(() => {
    }, [auth.accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/employees/${token.id}`, {
                    headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
                });
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const token = jwtDecode(auth.accessToken)
    console.log(selectedTab)
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <div className={"title"}>
                            <h1>Mój profil</h1>
                        </div>
                        <Row>
                            <Col>
                                <Card className={"card-profile"}>
                                    <Card.Body>
                                        {loading ? (
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>

                                            ) :(
                                            <div className="d-flex flex-column align-items-center">
                                            {/* Użycie ikony PersonCircle z Bootstrap Icons na samej górze */}
                                            <PersonCircle className="avatar-icon mb-3" />

                                            <div>
                                                <Card.Title as="h2">{`${profileData.name} ${profileData.lastname}`}</Card.Title>
                                                <Card.Subtitle as="h3" className="mb-2 ">{token.role}</Card.Subtitle>
                                            </div>
                                        </div>
                                            )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className={"profile-data"} md={8}>
                                <ProfileTabs onSelectTab={(tab) => setSelectedTab(tab)} />
                                {loading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>

                                ) : (
                                    <>
                                        {(() => {
                                            switch (selectedTab) {
                                                case 'overview':
                                                    return <OverviewSection initialData={profileData} />;
                                                case 'edit':
                                                    return <EmployeeEditForm onSave={handleEditButtonOnSave} profileMode={true} employeeId={token.id} initialData={profileData} />;
                                                case 'password':
                                                    return <PasswordResetForm onSave={handleEditButtonOnSave} profileMode={true} employeeId={token.id} initialData={profileData}  />
                                                default:
                                                    return <OverviewSection initialData={profileData} />;
                                            }
                                        })()}
                                    </>
                                    )}

                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetails;