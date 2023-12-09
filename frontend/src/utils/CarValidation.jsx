export const validateRegistrationNumber = (registrationNumber) => {
    const registrationNumberRegex =  /^[A-Z]{2}\d{5}$|^[A-Z]{2}\d{4}[A-Z]$/;
    return registrationNumberRegex.test(registrationNumber);
};
export const validateVinNumber = (vin) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
};