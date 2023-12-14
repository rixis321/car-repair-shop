import React from 'react';
import {useContext, useEffect, useState} from  "react"
import AuthContext from "../../security/AuthProvider.jsx";
import {Link, Navigate} from "react-router-dom";
import api from "../../api/axiosConfig.js";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Button, Container} from "react-bootstrap";
import GenericTable from "../../components/Utils/GenericTable.jsx";
import DeleteConfirmationModal from "../../components/Utils/DeleteConfirmModal.jsx";
import {jwtDecode} from "jwt-decode";


const Cars = () => {

    const { auth } = useContext(AuthContext);
    const [responseData, setResponseData] = useState(null);
    const [carsPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalContent, setDeleteModalContent] = useState({
        modalTitle: 'Usuwanie samochodu',
        modalBody: 'Czy na pewno chcesz usunać ten samochod? Będzie sie to wiązało z usunieciem pojazdu wraz z jego historia',
        apiLink: ''
    });

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    useEffect(() => {
        fetchData();
    }, [auth.accessToken]);


    const handleDelete = (carId) => {
        // Customize the modal content based on your needs
        const { modalTitle, modalBody } = deleteModalContent;
        const apiLink = `/cars/${carId}`;

        // Update the state with modal content
        setDeleteModalContent({
            modalTitle,
            modalBody,
            apiLink
        });
        setShowDeleteModal(true);
    };
    const handleDeleteConfirm = async () => {
        try {
            // Call the API to delete the record using selectedEmployeeId
            await api.delete(deleteModalContent.apiLink, {
                headers: { "Authorization": auth.accessToken }
            });

            fetchData();
        } catch (err) {
            console.log(err);
        } finally {
            // Close the modal
            setShowDeleteModal(false);
        }
    };


    const fetchData = async () => {
        try {
            const response = await api.get("/cars", {
                headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
            });

            setResponseData(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(responseData)
    // zmiana strony
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleSort = (key) => {
        setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    };
    const handleDetailsClick = (carId) => {
        return <Link to={`/cars/${carId}`}>Szczegóły</Link>;
    };
    return (
        <>
            <div className="admin-container">
                {auth.accessToken ? <AdminNavbar /> : null}
                <div className="flex-container">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content-wrapper">
                        <h2>Samochody</h2>
                        <Container fluid>
                            <GenericTable
                                data={responseData}
                                columns={[
                                    { key: 'brand', label: 'Marka' },
                                    { key: 'model', label: 'Model' },
                                    { key: 'fullOwnerName', label: 'Właściciel' },
                                    { key: 'registrationNumber', label: 'Nr.rejestracyjny' },
                                ]}
                                onDelete={(carId) => handleDelete(carId)}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                sortConfig={sortConfig}
                                onSort={(key) => handleSort(key)}
                                currentPage={currentPage}
                                itemsPerPage={carsPerPage}
                                onDetailsClick={(carId) => handleDetailsClick(carId)}
                            />
                            <DeleteConfirmationModal
                                show={showDeleteModal}
                                handleClose={() => setShowDeleteModal(false)}
                                handleDeleteConfirm={handleDeleteConfirm}
                                modalTitle={deleteModalContent.modalTitle}
                                modalBody={deleteModalContent.modalBody}
                                apiLink={deleteModalContent.apiLink}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cars;