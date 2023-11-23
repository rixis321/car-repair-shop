import React from 'react';
import NavItem from "./NavItem.jsx";
import {Routes} from "react-router";
import {Route} from "react-router-dom";

const AdminSidebar = () => {
    const sidebarData = [
        {
            label: 'Panel główny',
            icon: 'bi-grid',
            to: '/dashboard',
        },
        {
            label: 'Pracownicy',
            icon: 'bi-person-vcard',
            subitems: [
                {
                    label: 'Lista pracowników',
                    icon: 'bi-circle',
                    to: '/employees',
                },
                {
                    label: 'Dodaj pracownika',
                    icon: 'bi-circle',
                    to: '/employees/add',
                },
            ],
        },
        {
            label: 'Klienci',
            icon: 'bi bi-building-fill',
            subitems: [
                {
                    label: 'Lista klientów',
                    icon: 'bi-circle',
                    to: '/customers',
                },
                {
                    label: 'Dodaj klienta',
                    icon: 'bi-circle',
                    to: '/customers/add',
                },

            ],
        },
        {
            label: 'Samochody',
            icon: 'bi bi-car-front-fill',
            subitems: [
                {
                    label: 'Lista samochodów',
                    icon: 'bi-circle',
                    to: '/customers/cars',
                },
                {
                    label: 'Dodaj samochód',
                    icon: 'bi-circle',
                    to: '/customers/cars/add',
                },

            ],
        },
        {
            label: 'Diagnozy',
            icon: 'bi bi-clipboard2-pulse-fill',
            subitems: [
                {
                    label: 'Lista diagnoz',
                    icon: 'bi-circle',
                    to: '/diagnoses',
                },
                {
                    label: 'Dodaj diagnoze',
                    icon: 'bi-circle',
                    to: '/diagnoses/add',
                },
            ],
        },
        {
            label: 'Serwisy',
            icon: 'bi bi-gem',
            subitems: [
                {
                    label: 'Lista serwisów',
                    icon: 'bi-circle',
                    to: '/services',
                },
                {
                    label: 'Dodaj serwis',
                    icon: 'bi-circle',
                    to: '/services/add',
                },

            ],
        },
        {
            label: 'Faktury',
            icon: 'bi bi-pass-fill',
            to: "/invoices"
        },

    ];
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <aside id="sidebar" className="sidebar">
                        <ul className="sidebar-nav" id="sidebar-nav">
                            {sidebarData.map((item, index) => (
                                <NavItem key={index} {...item} />
                            ))}
                        </ul>
                    </aside>
                }
            />
        </Routes>
    );
};

export default AdminSidebar;