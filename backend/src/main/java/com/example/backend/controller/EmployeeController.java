package com.example.backend.controller;

import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/api")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @GetMapping("/employees")
    public ResponseEntity<List<ShortEmployeeDto>> getAllCustomers(){
        return new ResponseEntity<>(employeeService.getAllEmployees(),HttpStatus.OK);

    }
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> getCustomerById(@PathVariable Long id){
        return new ResponseEntity<>(employeeService.getEmployeeById(id),HttpStatus.OK);
    }
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id){
        return new ResponseEntity<>(employeeService.deleteEmployee(id),HttpStatus.OK);
    }
}
