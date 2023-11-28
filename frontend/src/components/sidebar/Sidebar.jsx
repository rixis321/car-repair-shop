import React, {useContext, lazy, Suspense, useEffect, useState} from 'react';
import NavItem from "./NavItem.jsx";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import AdminSideBarData from './AdminSideBarData.jsx';
import MechanicSideBarData from './MechanicSideBarData.jsx';
import ReceptionistSideBarData from './ReceptionistSideBarData.jsx';
import AuthContext from "../../security/AuthProvider.jsx";
import {jwtDecode} from "jwt-decode";
const Sidebar = () => {
    const {auth} = useContext(AuthContext)
    const token = jwtDecode(auth.accessToken)
    const [sidebarData, setSidebarData] = useState([]);

    useEffect(() => {

        const setRoleSidebarData = () => {
            switch (token.role) {
                case 'ADMIN':
                    setSidebarData(AdminSideBarData);
                    break;
                case 'MECHANIK':
                    setSidebarData(MechanicSideBarData);
                    break;
                case 'RECEPCJONISTA':
                    setSidebarData(ReceptionistSideBarData);
                    break;
                default:
                    setSidebarData([]);
            }
        };

        setRoleSidebarData();

    }, [token.role]);

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

export default Sidebar;