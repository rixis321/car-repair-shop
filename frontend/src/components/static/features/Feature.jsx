import React from 'react';
import FeatureData from "./FeatureData.jsx";
import "./feature-styles.css"
import image1 from  "../../../../assets/image1.jpg"
import image2 from  "../../../../assets/image2.jpg"
import image3 from  "../../../../assets/image3.jpg"
import image4 from  "../../../../assets/image4.jpg"
import image5 from  "../../../../assets/image5.jpg"
import image6 from  "../../../../assets/image6.jpg"
const Feature = () => {
    return (
        <div className="feature" id={"about"}>
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
                img2={image2}
            />

            <FeatureData
                className="first-des-reverse"
                heading="Śledzenie naprawy"
                text="Dostarczamy klientom możliwośc śledzenia naprawy swojego pojazdu poprzez kod SMS, dzięki temu
                ma on bezpośredni dostęp do informacji o stanie naprawy swojego pojazdu. "
                img1={image3}
                img2={image4}
            />
            <FeatureData
                className="first-des"
                heading="Generowanie faktur"
                text="System generowania faktur umożliwia właścicielowi warsztatu na błyskawiczne tworzenie dokumentów
                finansowych, co przekłada się na przyśpieszenie procesu rozliczeń i skraca czas potrzebny na sporządzanie faktur
                 ręcznie."
                img1={image5}
                img2={image6}
            />
        </div>
    );
};

export default Feature;