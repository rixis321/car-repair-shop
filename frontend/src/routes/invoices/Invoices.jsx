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
import dateFormat from "../../utils/DateFormat.jsx";
import jsPDF from "jspdf";
import DateFormat from "../../utils/DateFormat.jsx";


const Invoices = () => {

    const { auth } = useContext(AuthContext);
    const [responseData, setResponseData] = useState(null);

    const [invoicesPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


    //sprawdzenie czy token istnieje jesli nie to przekieruj na /login
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }

    useEffect(() => {
        fetchData();
    }, [auth.accessToken]);

    const fetchData = async () => {
        try {
            const response = await api.get("/invoices", {
                headers: { "Content-Type": "Application/json", "Authorization": auth.accessToken }
            });
            const formattedData = response.data.map(item => ({
                ...item,
                issueDate: dateFormat(item.issueDate)
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
    const handleDetailsClick = (invoiceId) => {
        return;
    };

    const handleDownload = async (invoiceId) => {
        try {
            const response = await api.get(`/invoices/${invoiceId}`, {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": auth.accessToken
                }
            });

            const invoiceData = response.data;

            // Utworzenie nowego dokumentu PDF
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            // Dodanie logo i stylów
            // Załadowanie logo (zakładając, że mamy obraz logo w base64)
            // const logoBase64 = 'data:image/png;base64,...'; // logo w formacie base64
            // pdf.addImage(logoBase64, 'PNG', 10, 10, 50, 15);

            pdf.setFont("Helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(33, 33, 33); // Kolor tekstu (ciemnoszary)

            // Dodanie tekstu 'Faktura VAT'
            pdf.setFontSize(16);
            pdf.text('Faktura VAT', 105, 25, null, null, 'center');

            // Dodanie numeru faktury
            pdf.setFontSize(10);
            pdf.text(`Numer faktury: ${invoiceData.invoiceNumber}`, 150, 40);

            // Dodanie dat
            pdf.text(`Data wystawienia: ${DateFormat(invoiceData.issueDate)}`, 150, 45);


            // Dodanie danych sprzedawcy i nabywcy
            pdf.setFontSize(11);
            pdf.text('Sprzedawca:', 20, 60);
            pdf.text('Nabywca:', 140, 60);

            // Przykładowe dane
            const sellerData = [
                'Warsztat Samochodowy Sp. z o.o.',
                'ul. Projektowa 21a',
                '02-548 Gliwice',
                'NIP 123-456-66-66'
            ];
            const buyerData = [
                invoiceData.fullOwnerName, // Nazwa nabywcy
                invoiceData.fullCarName, // Dane nabywcy
            ];

            sellerData.forEach((line, index) => {
                pdf.text(line, 20, 70 + (index * 5));
            });

            buyerData.forEach((line, index) => {
                pdf.text(line, 140, 70 + (index * 5));
            });

            // Dodanie tabeli z usługami
            pdf.setFontSize(13);
            pdf.text('Usluga:', 10, 120);

            pdf.setFontSize(11)
            pdf.text(`Opis diagnozy: ${invoiceData.diagnosis.description}`, 10, 130);
            pdf.text(`Szacowany koszt przed serwisowaniem: ${invoiceData.diagnosis.estimatedCost} zl`, 10, 140);
            pdf.text(`Opis uslugi: ${invoiceData.service.description}`, 10, 150);

                // Dodanie historii usługi
            pdf.text("Historia przeprowadzonej pracy:", 10, 160);
            pdf.setFont("italic");
            let historyYPosition = 170;
            pdf.setFontSize(10)
            invoiceData.service.serviceHistory.forEach((historyItem) => {
                pdf.text(`- ${historyItem.description} (${DateFormat(historyItem.date)})`, 10, historyYPosition);
                historyYPosition += 10;
            });
            pdf.setFontSize(13)
            pdf.text(`Do zaplaty: ${invoiceData.service.cost} zl`, 130, historyYPosition+20);

            // Pobranie pliku PDF
            pdf.save(`faktura_${invoiceData.invoiceNumber}.pdf`);

        } catch (error) {
            console.error("Błąd podczas pobierania i generowania faktury:", error);
        }
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
                        <h2>Faktury</h2>
                        <Container fluid>
                            <GenericTable
                                data={responseData}
                                columns={[
                                    { key: 'fullOwnerName', label: 'Imię i nazwisko właściciela' },
                                    { key: 'fullCarName', label: 'Samochód' },
                                    { key: 'invoiceNumber', label: 'Nr. faktury' },
                                    { key: 'issueDate', label: 'Data wystawienia' },
                                ]}
                                onDelete={(invoiceId) => handleDownload(invoiceId)}
                                onPageChange={(pageNumber) => handlePageChange(pageNumber)}
                                sortConfig={sortConfig}
                                onSort={(key) => handleSort(key)}
                                currentPage={currentPage}
                                itemsPerPage={invoicesPerPage}
                                onDetailsClick={(invoiceId) => handleDetailsClick(invoiceId)}
                                invoiceMode={true}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invoices;