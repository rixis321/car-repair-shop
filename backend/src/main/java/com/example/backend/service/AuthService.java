package com.example.backend.service;

import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewEmployeeDto;

public interface AuthService {

    String loginEmployee(LoginDto loginDto);

    NewEmployeeDto registerEmployee(NewEmployeeDto newEmployeeDto);
}
