import React from 'react';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProfileTabs = ({onSelectTab}) => {
    const handleTabSelect = (selectedKey) => {
        onSelectTab(selectedKey);
    };
    return (
        <Nav variant="tabs" defaultActiveKey="/profile" onSelect={handleTabSelect}>
            {/* Używamy Link zamiast href */}
            <Nav.Item>
               <Nav.Link eventKey={"overview"}>Przegląd</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={"edit"}>Edytuj profil</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={"password"}>Edytuj hasło</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default ProfileTabs;