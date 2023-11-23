import React from 'react';
import {useState} from "react";
import {Link} from "react-router-dom";
import {MenuItems} from "./NavbarItems.jsx";
import "./navbar-styles.css"

const Navbar = () => {
    const [isClicked, setIsClicked] = useState(false);
  const handleClick = () =>{
        setIsClicked(!isClicked);
    }
    return (
        <div>
            <nav className="NavbarItems">
                <h1 className="navbar-logo"> Warsztat samochodowy</h1>
                <div className="menu-icons" onClick={handleClick}>
                    <i
                        className={isClicked ? "fas fa-times" : "fas fa-bars"}
                    ></i>
                </div>
                <ul className={isClicked ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}

                </ul>
            </nav>
        </div>
    );
};

export default Navbar;