import React from 'react';
import {useContext, useEffect, useState} from  "react"
import AuthContext from "../../security/AuthProvider.jsx";
import {Link, Navigate} from "react-router-dom";
import api from "../../api/axiosConfig.js";
import AdminNavbar from "../../components/navbar/AdminNavbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {Button, Container} from "react-bootstrap";
import GenericTable from "../../components/Utils/GenericTable.jsx";
import dateFormat from "../../utils/DateFormat.jsx";
import "./diagnoses-styles.css"
import DeleteConfirmationModal from "../../components/Utils/DeleteConfirmModal.jsx";

const Diagnoses = () => {

    const { auth } = useContext(AuthContext);
    const [responseData, setResponseData] = useState(null);
    const [filterState, setFilterState] = useState(null);

    const [diagnosesPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalContent, setDeleteModalContent] = useState({
        modalTitle: 'Usuwanie diagnozy',
        modalBody: 'Czy na pewno chcesz usunać diagnoze? Będzie sie to wiązało z usunieciem pracy serwisowej z nią związanej',
        apiLink: ''
    });

    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const handleFilter = (state) => {
        setFilterState(state);
    };
    const filterData = (data, filterState) => {
        if (!filterState) return data;

        return data.filter(item => item.clientApproval === filterState);
    };

    useEffect(() => {
        fetchData();
    }, [auth.accessToken]);


    const handleDelete = (diagnosisId) => {
        // Customize the modal content based on your needs
        const { modalTitle, modalBody } = deleteModalContent;
        const apiLink = `/diagnosis/${diagnosisId}`;

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
            const response = await api.get("/diagnosis", {
                headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
            });

            const formattedData = response.data.map(item => ({
                ...item,
                diagnosisDate: dateFormat(item.diagnosisDate)
            }));

            setResponseData(formattedData);
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
    const handleDetailsClick = (diagnosisId) => {
        return <Link to={`/diagnosis/${diagnosisId}`}>Szczegóły</Link>;
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
                        <h2>Diagnozy</h2>
                        <div className="filter-buttons ">
                            <Button variant="primary" onClick={() => handleFilter('')}>Wszystkie</Button>
                            <Button variant="primary" onClick={() => handleFilter('OCZEKUJE')}>Oczekujace</Button>
                            <Button variant="primary" onClick={() => handleFilter('ZATWIERDZONO')}>Zatwierdzone</Button>
                            <Button variant="primary" onClick={() => handleFilter("ODRZUCONO")}>Odrzucone</Button>
                        </div>
                        <Container fluid>
                            <GenericTable
                                data={filterData(responseData,filterState)}
                                columns={[
                                    { key: 'fullNameOfEmployee', label: 'Imie i nazwisko pracownika' },
                                    { key: 'description', label: 'Postawiona diagnoza' },
                                    { key: 'registrationNumber', label: 'Nr. rejestracyjny' },
                                    { key: 'clientApproval', label: 'Status' },
                                    { key: 'diagnosisDate', label: 'Data' },
                                ]}
                                onDelete={(employeeId) => handleDelete(employeeId)}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                sortConfig={sortConfig}
                                onSort={(key) => handleSort(key)}
                                currentPage={currentPage}
                                itemsPerPage={diagnosesPerPage}
                                onDetailsClick={(diagnosisId) => handleDetailsClick(diagnosisId)}
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

export default Diagnoses;