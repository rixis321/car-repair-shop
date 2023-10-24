package com.example.backend.utils;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ValidationException;
import com.example.backend.payload.NewCustomerDto;
import com.example.backend.payload.NewEmployeeDto;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class UserDataValidator {

    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;

    public UserDataValidator(CustomerRepository customerRepository, EmployeeRepository employeeRepository) {
        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
    }

    public boolean checkCustomerData(NewCustomerDto newCustomerDto){
        return validateString(newCustomerDto.getName()) && validateString(newCustomerDto.getLastname())
                && validatePhoneNumber(newCustomerDto.getPhone(),"customer") && validateString(newCustomerDto.getUserAddress().getCity())
                && validateString(newCustomerDto.getUserAddress().getStreetName())
                && validateStreetNumber(newCustomerDto.getUserAddress().getStreetNumber())
                && validateZipCode(newCustomerDto.getUserAddress().getZipcode());

    }
    public boolean checkEmployeeData(NewEmployeeDto newEmployeeDto){
        return  validateEmail(newEmployeeDto.getEmail()) && validatePassword(newEmployeeDto.getPassword()) &&
                validateString(newEmployeeDto.getName()) && validateString(newEmployeeDto.getLastname())
                && validatePhoneNumber(newEmployeeDto.getPhone(),"employee") && validateString(newEmployeeDto.getUserAddress().getCity())
                && validateString(newEmployeeDto.getUserAddress().getStreetName())
                && validateStreetNumber(newEmployeeDto.getUserAddress().getStreetNumber())
                && validateZipCode(newEmployeeDto.getUserAddress().getZipcode());

    }


    private boolean validateString(String name){
        if((name == null || name.isEmpty())|| !name.matches("^\\s*[a-zA-Z]+(\\s+[a-zA-Z]+)*\\s*$")){
            throw new ValidationException("String");
        }
        return  true;
    }
    private boolean validatePhoneNumber(String phoneNumber, String userType){
        String regex = "^\\s*[0-9]{3}\\s*[0-9]{3}\\s*[0-9]{3}\\s*$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);

        if(matcher.matches()){
            if(userType.equals("customer")){
                if(customerRepository.existsByPhone(phoneNumber)){
                    throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"account with that phone number already exists");
                }else
                    return true;
            }else {
                if(employeeRepository.existsByPhone(phoneNumber)){
                    throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"account with that phone number already exists");
                }else
                    return true;
            }

        }else{
            throw new ValidationException("phoneNumber");
        }
    }

    private boolean validateZipCode(String zipcode){
        String regex = "^\\s*[0-9]{2}\\s*-\\s*[0-9]{3}\\s*$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(zipcode);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("zipcode");
        }
    }

    private boolean validateStreetNumber(String streetNumber){
        String regex = "^[a-zA-Z0-9]+$";
        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(streetNumber);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("streetNumber");
        }
    }
    private String capitalizeString(String text){
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }
    private boolean validateEmail(String email){
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("email");
        }
    }
    private boolean validatePassword(String password){
        String regex = "^(?=.*[A-Z])(?=.*\\d.*\\d.*\\d)[A-Za-z\\d]{8,}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("password");
        }
    }
}
