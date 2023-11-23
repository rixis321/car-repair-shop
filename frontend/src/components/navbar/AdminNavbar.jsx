import React, { useState } from 'react';
import "./admin-navbar-styles.css"
import {Link} from "react-router-dom";

const AdminNavbar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    return (
        <header id="header" className={`header fixed-top d-flex align-items-center ${isDropdownVisible ? 'dropdown-open' : ''}`}>
            <div className="d-flex align-items-center justify-content-between">
                <a  className="logo d-flex align-items-center">
                    <span className="d-sm-flex d-lg-block">Warsztat samochodowy</span>
                </a>
            </div>
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item dropdown pe-3">
                        <Link
                            className="nav-link nav-profile d-flex align-items-center pe-0"
                            onClick={toggleDropdown}
                        >
                            <span className="d-none d-md-none d-lg-inline dropdown-toggle ps-2">
                                K. Anderson
                            </span>
                        </Link>

                        {isDropdownVisible && (
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile animated-dropdown">
                                <li className="dropdown-header">
                                    <h6>Kevin Anderson</h6>
                                    <span>Web Designer</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="">
                                        <i className="bi bi-person "></i>
                                        <span>Mój profil</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Wyloguj</span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminNavbar;
