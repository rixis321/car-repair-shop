import React from 'react';
import NavItem from "./NavItem.jsx";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import sidebarData from "./SideBarData.jsx"
const AdminSidebar = () => {

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