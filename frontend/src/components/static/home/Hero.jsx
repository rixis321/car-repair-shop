import React from 'react';
import "./hero-styles.css"
import image from  "../assets/hero-image.jpg"
const Hero = (props) => {
    return (
        <>
            <div className={props.cName} id={"/"}>
                <img src={image} alt="HerpImg" />

                <div className="hero-text">
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                </div>
            </div>
        </>
    );
};

export default Hero;