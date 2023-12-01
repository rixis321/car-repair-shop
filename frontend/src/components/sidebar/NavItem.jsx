import React from 'react';
import {Route, Link } from 'react-router-dom';
import {Routes} from "react-router";
import "./sidebar-styless.css"
const NavItemWithSubitems = ({ icon, label, subitems }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="nav-item">
            <Link
                className={`nav-link collapsed ${isOpen ? 'active' : ''}`}
                to={subitems ? '#' : '/' + to}
                data-bs-toggle="collapse"
                href="#"
                onClick={handleToggle}
            >
                {icon && <i className={`bi ${icon}`}></i>}
                <span>{label}</span>
                {subitems && <i className="bi bi-chevron-down ms-auto"></i>}
            </Link>
            {subitems && (
                <ul className={`nav-content collapse ${isOpen ? 'show' : ''}`}>
                    {subitems.map((subitem, index) => (
                        <NavItem key={index} {...subitem} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const NavItem = ({ icon, label, subitems, isActive, to }) => {
    if (subitems) {
        return <NavItemWithSubitems icon={icon} label={label} subitems={subitems} />;
    } else {
        return (
            <li className={`nav-item ${isActive ? 'active' : ''}`}>
                <Link className="nav-link" to={to}>
                    {icon && <i className={`bi ${icon}`}></i>}
                    <span>{label}</span>
                </Link>
            </li>
        );
    }
};
export default NavItem;
