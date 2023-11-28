import React, {useContext, useState} from 'react';
import "./admin-navbar-styles.css"
import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate} from "react-router";

const AdminNavbar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const {auth,setAuth} = useContext(AuthContext)
    let navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    const handleLogout = () =>{
        sessionStorage.clear();
        setAuth({accessToken:null})
        navigate("/")

    }
    const token = jwtDecode(auth.accessToken)

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
                                {token.name}
                            </span>
                        </Link>

                        {isDropdownVisible && (
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile animated-dropdown workspace-container">
                                <li className="dropdown-header">
                                    <h6>
                                        {
                                            token.name +" "+ token.lastName
                                        }
                                    </h6>
                                    <span>
                                        {
                                            token.role
                                        }
                                    </span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center workspace-row" href="">
                                        <i className="bi bi-person "></i>
                                        <Link className={"logout"}  onClick={handleLogout}>
                                            <span>Mój profil</span>
                                        </Link>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center workspace-row " href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <Link className={"logout"} to={"/"} onClick={handleLogout}>
                                            <span>Wyloguj</span>
                                        </Link>

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
