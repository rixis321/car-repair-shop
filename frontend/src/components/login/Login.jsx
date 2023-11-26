import React, {useContext, useEffect, useState} from 'react';
import "./login-style.css"
import {Link} from "react-router-dom";
import api from "../../api/axiosConfig.js";
import AuthContext from "../../security/AuthProvider.jsx";
import {useNavigate} from "react-router";

const LOGIN_URL = "auth/login";
const Login = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [errorMessage,setErrorMessage]= useState("");
    const {auth,setAuth} = useContext(AuthContext)

    useEffect(()=>{
        setErrorMessage("")
    },[email,password]);

    useEffect(() => {
        if (auth.accessToken) {
            navigate("/dashboard");
        }
    }, [auth.accessToken]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await api.post(
                LOGIN_URL,
                JSON.stringify({
                    email:email,
                    password: password
                }),
                {
                    headers:{"Content-Type": "Application/json"}
                }
            )
            const accessToken = response.data;
            setAuth({accessToken})
            sessionStorage.setItem("token",accessToken);
            navigate("/dashboard")
            console.log(response.data)

        }catch (err){
            if(err.response.status === 500){
                setErrorMessage(err.response.data.message)
                console.log(err.response.data.message)
            }
        }
       // console.log(errorMessage)
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
                                                <h5 className="card-title text-center pb-0 fs-4">Logowanie</h5>
                                                {errorMessage.length === 0 ? null : <p>{errorMessage}</p>}

                                            </div>

                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            value={email}
                                                            onChange={(e)=>setEmail(e.target.value)}
                                                            id="yourUsername" required/>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Hasło</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e)=> setPassword(e.target.value)}
                                                        id="yourPassword" required/>
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
        </>

    );
};

export default Login;