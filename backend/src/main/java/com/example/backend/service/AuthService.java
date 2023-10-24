package com.example.backend.service;

import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewCustomerDto;
import com.example.backend.payload.NewEmployeeDto;

public interface AuthService {

    String login(LoginDto loginDto);

    NewEmployeeDto register(NewEmployeeDto newEmployeeDto);
}
