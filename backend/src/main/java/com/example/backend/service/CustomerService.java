package com.example.backend.service;

import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.ShortCustomerWithoutCode;

import java.util.List;

public interface CustomerService {

    CustomerDto getCustomerById(Long id);
    List<ShortCustomerDto> getAllCustomers();
    NewCustomerDto updateCustomer(NewCustomerDto customerDto, Long customerId);
    String deleteCustomer(Long customerId);
    NewCustomerDto createCustomer(NewCustomerDto customerDto);

    ShortCustomerWithoutCode getCustomerByAccessCode(String accessCode);
}
