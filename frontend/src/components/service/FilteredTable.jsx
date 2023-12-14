import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import GenericTable from "../Utils/GenericTable.jsx";


const FilteredTable = ({ services, diagnoses, onEndServiceClick }) => {
    const [filteredServices, setFilteredServices] = useState([]);
    const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        filterServices();
        filterDiagnoses();
    }, [services, diagnoses, filterStatus]);

    const filterServices = () => {
        const filtered = services.filter(
            (service) => service.serviceStatus === filterStatus
        );
        setFilteredServices(filtered);
    };

    const filterDiagnoses = () => {
        const filtered = diagnoses.filter(
            (diagnosis) => diagnosis.status === 'ODRZUCONE'
        );
        setFilteredDiagnoses(filtered);
    };

    const handleFilterStatus = (status) => {
        setFilterStatus(status);
    };

    const serviceColumns = [
        { key: 'description', label: 'Opis pracy serwisowej' },
        { key: 'cost', label: 'Koszt [pln]' },
        { key: 'serviceStatus', label: 'Status serwisu' },
        {
            key: 'action',
            label: 'Akcja',
            content: (service) => (
                <span className="end-service-span text-primary" onClick={() => onEndServiceClick(service.id)}>
          Zakończ serwis
        </span>
            ),
        },
    ];

    const diagnosisColumns = [
        { key: 'description', label: 'Opis diagnozy' },
        { key: 'status', label: 'Status diagnozy' },
    ];

    return (
        <>
            <div className="filter-buttons">
                <Button
                    variant="primary"
                    onClick={() => handleFilterStatus('OCZEKUJE_NA_KLIENTA')}
                >
                    Filtruj OCZEKUJE_NA_KLIENTA
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleFilterStatus('ZAKONCZONE')}
                >
                    Filtruj ZAKONCZONE
                </Button>
            </div>
            <div>
                <h2>Tabela serwisów</h2>
                <GenericTable
                    data={filteredServices}
                    columns={serviceColumns}
                    onEndServiceClick={onEndServiceClick}
                />
            </div>
            <div>
                <h2>Tabela diagnoz</h2>
                <GenericTable data={filteredDiagnoses} columns={diagnosisColumns} />
            </div>
        </>
    );
};

export default FilteredTable;
