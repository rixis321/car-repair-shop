package com.example.backend.payload.Customer;

import jakarta.validation.constraints.NotEmpty;

public class ShortCustomerWithoutCode {
    private long id;
    @NotEmpty(message = "Name should not be null or empty")
    private String name;
    @NotEmpty(message = "lastname should not be null or empty")
    private String lastname;
}
