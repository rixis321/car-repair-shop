import React from 'react';
import "./login-style.css"
import {Link} from "react-router-dom";
const Login = () => {
    return (
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

                                       <div className="pt-4 pb-2">
                                           <h5 className="card-title text-center pb-0 fs-4">Logowanie</h5>
                                       </div>

                                       <form className="row g-3 needs-validation" noValidate>

                                           <div className="col-12">
                                               <label htmlFor="yourUsername" className="form-label">Email</label>
                                               <div className="input-group has-validation">
                                                   <input type="text" name="username" className="form-control"
                                                          id="yourUsername" required/>
                                               </div>
                                           </div>

                                           <div className="col-12">
                                               <label htmlFor="yourPassword" className="form-label">Hasło</label>
                                               <input type="password" name="password" className="form-control"
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
    );
};

export default Login;