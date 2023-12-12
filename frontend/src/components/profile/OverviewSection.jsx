// Import React
import React, {useState} from 'react';
import "./overview-section-styles.css"
// Komponent reprezentujący sekcję "Przegląd"
const OverviewSection = ({initialData}) => {
    const [data, setData] = useState(initialData)

    return (
        <div className="profile-section">
            <h5 className="section-header">Szczegóły profilu</h5>
            <div className="details">
                <p><strong>Imię:</strong> {data.name}</p>
                <p><strong>Nazwisko:</strong> {data.lastname}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Hasło:</strong> **********</p>
                <p><strong>Telefon:</strong> {data.phone}</p>
                <p><strong>Adres:</strong> {data.userAddressDto.city + ", " + data.userAddressDto.zipcode + ", "
                    + data.userAddressDto.streetName + ", " + data.userAddressDto.streetNumber}</p>
            </div>
        </div>
    );
};

export default OverviewSection;