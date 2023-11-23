import React from 'react';
import "./footer-styles.css"
const Footer = () => {
    return (
        <div className="footer">
            <div className="top">
                <div>
                    <h1>Warsztat samochodowy</h1>
                    <p>Profesjonalne podejście i zadowolenie klienta</p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Kontakt</h4>
                        <p>nr. tel: +48 123-456-789</p>
                        <p>email: konrsyg825@student.polsl.pl</p>
                    </div>
                    <div className="col-md-6">
                        <h4>Nasz profil</h4>
                        <p><a href="https://www.linkedin.com/in/konrad-sygut-9aa95126a/">Linkedin</a></p>
                        <p><a href="https://github.com/rixis321">Github</a></p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Footer;