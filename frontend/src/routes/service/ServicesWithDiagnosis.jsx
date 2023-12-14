import React from 'react';
import {Button, Container} from "react-bootstrap";
import GenericTable from "../../components/Utils/GenericTable.jsx";
import DeleteConfirmationModal from "../../components/Utils/DeleteConfirmModal.jsx";
import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import AuthContext from "../../security/AuthProvider.jsx";
import api from "../../api/axiosConfig.js";
import {useEffect} from "react";
import FilteredTable from "../../components/service/FilteredTable.jsx";

const ServicesWithDiagnosis = () => {

    const { auth } = useContext(AuthContext);
    const [filterState, setFilterState] = useState(null);

    const [services, setServices] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);


    const [currentPageDiagnoses, setCurrentPageDiagnoses] = useState(1);
    const [diagnosesPerPage] = useState(7);

    const [servicesPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [showEndServiceModal, setShowEndServiceModal] = useState(false);
    const [endModalContent, setEndModalContent] = useState({
        modalTitle: 'Zakonczenie pracy serwisowej',
        modalBody: 'Samochod został odebrany przez klienta',
        apiLink: ''
    });
    useEffect(() => {
        fetchData();
    }, [auth.accessToken]);
    const formatStatus = (status) => {
        return status.replace(/_/g, " ");
    };
    const handleSort = (key) => {
        setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    };
    const formatData = (data) => {
        if (!data) {
            return [];
        }

        return data.map((item) => {
            return {
                ...item,
                serviceStatus: formatStatus(item.serviceStatus),
            };
        });
    };
    const filterData = (data, filterState) => {
        if (!filterState) return data;

        return data.filter(item => item.serviceStatus === filterState);
    };

    const handleEndService = (serviceId) => {
        const { modalTitle, modalBody } = endModalContent;
        const apiLink = `/services/${serviceId}/status?status=ZAKONCZONE`;

        setEndModalContent({
            modalTitle,
            modalBody,
            apiLink
        });
        setShowEndServiceModal(true);
    };
    const fetchData = async () => {
        try {
            const response = await api.get("/diagnosis/services/receptionist", {
                headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
            });

            console.log(response.data)
            setServices(response.data.services)
            setDiagnoses(response.data.diagnosis)
        } catch (err) {
            console.log(err);
        }
    };
    const handleChangeStatusConfirm = async () => {
        try {

            await api.put(endModalContent.apiLink, {
                headers: { "Authorization": auth.accessToken }
            });

            fetchData();
        } catch (err) {
            console.log(err);
        } finally {
            // Close the modal
            setShowEndServiceModal(false);
        }
    };
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services
        ? formatData(services).slice(indexOfFirstService, indexOfLastService)
        : [];

    const indexOfLastDiagnosis = currentPageDiagnoses * diagnosesPerPage;
    const indexOfFirstDiagnosis = indexOfLastDiagnosis - diagnosesPerPage;
    const currentDiagnoses = diagnoses
        ? diagnoses.slice(indexOfFirstDiagnosis, indexOfLastDiagnosis)
        : [];

    const paginateDiagnoses = (pageNumber) => setCurrentPageDiagnoses(pageNumber);


    const handleDetails = () =>{
        return;
    }
    return (
        <div className="content-wrapper">
            <h2>Usługi do odebrania </h2>
            {services && (
                <GenericTable
                    data={filterData(currentServices, null)} // Passing filtered and paginated data
                    columns={[
                        { key: 'description', label: 'Opis pracy serwisowej' },
                        { key: 'cost', label: 'Koszt [pln]' },
                        { key: 'serviceStatus', label: 'Status serwisu' },
                    ]}
                    onEndServiceClick={(serviceId) => handleEndService(serviceId)}
                    sortConfig={sortConfig}
                    onSort={(key) => handleSort(key)}
                    currentPage={currentPage}
                    itemsPerPage={servicesPerPage}
                    onPageChange={paginate}
                    onDetailsClick={handleDetails}
                />
            )}
            <h2>Odrzucone diagnozy </h2>
            {services && (
                <GenericTable
                    data={diagnoses}
                    columns={[
                        { key: 'description', label: 'Opis diagnozy' },
                        { key: 'clientApproval', label: 'Status diagnozy' },
                    ]}
                    onEndServiceClick={(serviceId) => handleEndService(serviceId)}
                    sortConfig={sortConfig}
                    onSort={(key) => handleSort(key)}
                    currentPage={currentPageDiagnoses}
                    itemsPerPage={diagnosesPerPage}
                    onPageChange={paginateDiagnoses}
                    onDetailsClick={handleDetails}
                />

            )}
            <DeleteConfirmationModal
                show={showEndServiceModal}
                handleClose={() => setShowEndServiceModal(false)}
                handleDeleteConfirm={handleChangeStatusConfirm}
                modalTitle={endModalContent.modalTitle}
                modalBody={endModalContent.modalBody}
                apiLink={endModalContent.apiLink}
                endService={true}
            />
        </div>
    );
};

export default ServicesWithDiagnosis;