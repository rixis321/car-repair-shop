package com.example.backend.service;

import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EmployeeService {
    EmployeeDto getEmployeeById(Long id);

    List<ShortEmployeeDto> getAllEmployees();

    NewEmployeeDto updateEmployee(NewEmployeeDto employeeDto, Long employeeId);

    String deleteEmployee(Long employeeId);

}
