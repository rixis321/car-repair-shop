import React from 'react';
import Navbar from "../../components/static/navbar/Navbar.jsx";
import Hero from "../../components/static/home/Hero.jsx";
import Feature from "../../components/static/features/Feature.jsx";
import Footer from "../../components/static/footer/Footer.jsx";

const Home = () => {
    return (
        <>
            <Navbar/>
            <Hero
                cName="hero"
                heroImg="https://unsplash.com/photos/Y3eGhgFu7ns/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGNhciUyMHJlcGFpciUyMHNob3B8ZW58MHx8fHwxNzAwNzA2MTE3fDA&force=true&w=1920"
                title="Nasz warsztat. Twój samochód"
                text="Profesjonalne podejście i zadowolenie klienta"
                url="/"
            />
            <Feature/>
            <Footer/>
        </>
            );
};

export default Home;