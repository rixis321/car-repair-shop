import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import Footer from "../../components/static/footer/Footer.jsx";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [accessCode, setAccessCode] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("")
    }, [accessCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8080/client/customers/access?accessCode=${accessCode}`,
                {
                    headers: { "Content-Type": "Application/json" }
                }
            )
            if(response.status === 200){
                navigate('/client/details', { state: { clientData: response.data } });
                sessionStorage.setItem("accessCode",accessCode);
            }
            console.log(response.data)

        } catch (err) {
            if (err.response.status === 400) {
                setErrorMessage(err.response.data.message)
                console.log(err.response.data.message)
            }
        }
    }

    return (
        <>
            <main className="main">
                <div className="container">

                    <section
                        className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container box">
                            <div className="row justify-content-center">
                                <div
                                    className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <Link to={"/"} className="logo d-flex align-items-center w-auto">
                                            <span className="d-none d-lg-block">Warsztat Samochodowy</span>
                                        </Link>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body pb-5" >

                                            <div className="pt-4 pb-2 nameWorkspace">
                                                <h5 className="card-title text-center pb-0 fs-4">Sprawdz status swojej naprawy</h5>
                                                {errorMessage.length === 0 ? null : <p>{errorMessage}</p>}

                                            </div>

                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

                                                <div className="col-12">
                                                    <label htmlFor="accessCode" className="form-label">Kod</label>
                                                    <div className="input-group has-validation">
                                                        <input
                                                            type="text"
                                                            name="accessCode"
                                                            className="form-control"
                                                            value={accessCode}
                                                            onChange={(e)=>setAccessCode(e.target.value)}
                                                            id="accessCode" required/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn  btn-primary w-100" type="submit">Zaloguj</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
            <Footer/>
        </>

    );
};

export default Login;