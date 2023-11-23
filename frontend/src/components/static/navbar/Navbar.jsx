import React from 'react';
import { useState } from "react";
import {Link, Link as RouterLink} from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { MenuItems } from "./NavbarItems.jsx";
import "./navbar-styles.css";

const Navbar = () => {
    const [selectedNavItem, setSelectedNavItem] = useState(null);

    const handleClick = (item) => {
        setSelectedNavItem(item.url === "/" ? item : null);
    };
    const scrollToTop = () => {
        if (selectedNavItem && selectedNavItem.url === "/") {
            scroll.scrollToTop({
                smooth: true,
                duration: 100,
            });
        }
    };

    return (
        <div>
            <nav className="NavbarItems">
                <h1 className="navbar-logo"> Warsztat samochodowy</h1>
                <ul className={"nav-menu"}>
                    {MenuItems.map((item, index) => {
                        if(item.url === "/" || item.url ==="/about" || item.url ==="/contact"){
                            return (
                                <li key={index}>
                                    <ScrollLink
                                        className={item.cName}
                                        to={item.url.substring(1)}
                                        smooth={true}
                                        duration={100}
                                        onClick={() => {
                                            if (item.url === "/") {
                                                handleClick(item)
                                                scrollToTop();
                                            }
                                        }}
                                    >
                                        <i className={item.icon}></i>
                                        {item.title}
                                    </ScrollLink>
                                </li>
                            );
                        }else
                            return (
                                <li key={index}>
                                    <Link
                                        key={index}
                                        className={item.cName}
                                        to={item.url}
                                    >
                                        <i className={item.icon}></i>
                                        {item.title}
                                    </Link>
                                </li>
                            )

                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
