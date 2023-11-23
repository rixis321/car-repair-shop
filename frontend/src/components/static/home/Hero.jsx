import React from 'react';
import "./hero-styles.css"
const Hero = (props) => {
    return (
        <>
            <div className={props.cName} id={"/"}>
                <img src={props.heroImg} alt="HerpImg" />

                <div className="hero-text">
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                </div>
            </div>
        </>
    );
};

export default Hero;