package com.example.backend.controller;

import com.example.backend.payload.JwtAuthResponse;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewCustomerDto;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerRepository userRepository, CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/users")
    public ResponseEntity<NewCustomerDto> createCustomer(@RequestBody NewCustomerDto newCustomerDto){

        return new ResponseEntity<>(customerService.createCustomer(newCustomerDto), HttpStatus.CREATED);
    }

}
