package com.example.backend.service;

import com.example.backend.payload.NewCustomerDto;
import com.example.backend.payload.ShortCustomerDto;
import com.example.backend.payload.CustomerDto;

import java.util.List;

public interface CustomerService {

    CustomerDto getCustomerById(Long id);

    List<ShortCustomerDto> getAllUsers();

    NewCustomerDto updateUser(NewCustomerDto customerDto, Long userId);

    void deleteCustomer(Long userId);

    NewCustomerDto createCustomer(NewCustomerDto customerDto);
}
