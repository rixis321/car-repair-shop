package com.example.backend.service;

import com.example.backend.payload.Employee.LoginDto;
import com.example.backend.payload.Employee.NewEmployeeDto;

public interface AuthService {

    String loginEmployee(LoginDto loginDto);

    NewEmployeeDto registerEmployee(NewEmployeeDto newEmployeeDto);
}
