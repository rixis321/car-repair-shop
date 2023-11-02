package com.example.backend.validator;

import com.example.backend.exception.ValidationException;
import com.example.backend.payload.Car.NewCarDto;
import com.example.backend.repository.CarRepository;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class CarDataValidator {
    private final CarRepository carRepository;

    public CarDataValidator(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public boolean validateCarData(NewCarDto carDto){
        return validateLicensePlate(carDto.getRegistrationNumber()) && validateVinNumber(carDto.getCarInfoDto().getVinNumber())
                && validateProductionYear(carDto.getCarInfoDto().getProductionYear());
    }

    private boolean validateProductionYear(int year){
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        return year >= 1886 && year <= currentYear;
    }
    private boolean validateLicensePlate(String licensePlate){
        String pattern =  "^[A-Z]{2,3}\\s?[0-9]{4,5}$";

        Pattern regex = Pattern.compile(pattern);
        if(licensePlate != null){
            Matcher matcher = regex.matcher(licensePlate);
            if(matcher.matches()){
                return true;
            }else
                throw new ValidationException("License plate");
        }else {
            throw new ValidationException("License plate");
        }

    }
     private boolean validateVinNumber(String vin){
         String pattern = "^[A-HJ-NPR-Z0-9]{17}$";
         Pattern regex = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE);
         if(vin != null){
             Matcher matcher = regex.matcher(vin);
             if(matcher.matches()){
                 return true;
             }else
                 throw new ValidationException("Vin number");
         }else
             throw new ValidationException("Vin number");

     }


}
