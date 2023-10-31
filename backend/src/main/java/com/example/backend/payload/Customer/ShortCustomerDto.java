package com.example.backend.payload.Customer;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortCustomerDto {
    private long id;
    @NotEmpty(message = "Name should not be null or empty")
    private String name;
    @NotEmpty(message = "lastname should not be null or empty")
    private String lastname;
    @NotEmpty(message = "phone number should not be null or empty")
    private String phone;
    @NotEmpty(message = "accessCode cannot be empty or null")
    private int accessCode;
}
