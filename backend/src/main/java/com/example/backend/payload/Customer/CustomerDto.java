package com.example.backend.payload.Customer;

import com.example.backend.model.Car;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.Car.CarDto;
import com.example.backend.payload.Car.ShortCarCustomerDto;
import com.example.backend.payload.Car.ShortCarDto;
import com.example.backend.payload.UserAddressDto;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
//TODO
public class CustomerDto {
    private long id;
    @NotEmpty(message = "Name should not be null or empty")
    private String name;
    @NotEmpty(message = "lastname should not be null or empty")
    private String lastname;
    @NotEmpty(message = "phone number should not be null or empty")
    private String phone;
    @NotEmpty(message = "accessCode cannot be empty or null")
    private String accessCode;
    private UserAddressDto userAddressDto;
    private Set<ShortCarCustomerDto> cars;
}
