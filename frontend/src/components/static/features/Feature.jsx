import React from 'react';
import image1 from "../../../../assets/image.jpg"
import FeatureData from "./FeatureData.jsx";
import "./feature-styles.css"
const Feature = () => {
    return (
        <div className="feature">
            <h1>Zalety naszego systemu</h1>
            <p>Nasze narzędzia pozwalają na efektywną prace warsztatu samochodowego
                oraz poprawiają obsługę klienta. </p>

            <FeatureData
                className="first-des"
                heading="Panel dla pracowników"
                text="Nasz system udostepnia panel dla pracowników, dzieki któremu właściciel warsztatu
                może łatwo przeglądać i kontrolować prace swoich pracowników, co przekłada się na efektywność
                 planowania oraz monitorowania prac"
                img1={image1}
                img2={image1}
            />

            <FeatureData
                className="first-des-reverse"
                heading="Śledzenie naprawy"
                text="Dostarczamy klientom możliwośc śledzenia naprawy swojego pojazdu poprzez kod SMS, dzięki temu
                ma on bezpośredni dostęp do informacji o stanie naprawy swojego pojazdu. "
                img1={image1}
                img2={image1}
            />
            <FeatureData
                className="first-des"
                heading="Generowanie faktur"
                text="System generowania faktur umożliwia właścicielowi warsztatu na błyskawiczne tworzenie dokumentów
                finansowych, co przekłada się na przyśpieszenie procesu rozliczeń i skraca czas potrzebny na sporządzanie faktur
                 ręcznie."
                img1={image1}
                img2={image1}
            />
        </div>
    );
};

export default Feature;