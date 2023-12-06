export const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
};

export const validateCity = (city) => {
    const cityRegex = /^[A-Za-z]+$/;
    return cityRegex.test(city);
};

export const validatePassword = (password) => {

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d{3,}).*$/;
    return passwordRegex.test(password);
};

export const validateStreetName = (streetName) => {

    const streetNameRegex = /^[A-Za-z]+$/;
    return streetNameRegex.test(streetName);
};

export const validateStreetNumber = (streetNumber) => {

    const streetNumberRegex = /^\d+$/;
    return streetNumberRegex.test(streetNumber);
};

export const validateZipCode = (zipCode) => {

    const zipCodeRegex = /^\d{2}-?\d{3}$/;
    return zipCodeRegex.test(zipCode);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone);
};
