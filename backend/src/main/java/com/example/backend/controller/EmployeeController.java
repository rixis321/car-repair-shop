package com.example.backend.controller;

import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @GetMapping("/employees")
    public ResponseEntity<List<ShortEmployeeDto>> getAllEmployees(){
        return new ResponseEntity<>(employeeService.getAllEmployees(),HttpStatus.OK);

    }
    @PostMapping("/employees/{employeeId}/reset")
    public ResponseEntity<String> updateEmployeePassword(@PathVariable long employeeId,@RequestBody String password){
        return new ResponseEntity<>(employeeService.updateEmployeePassword(employeeId,password),HttpStatus.OK);
    }
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id){
        return new ResponseEntity<>(employeeService.getEmployeeById(id),HttpStatus.OK);
    }
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        return new ResponseEntity<>(employeeService.deleteEmployee(id),HttpStatus.OK);
    }
    @PutMapping("/employees/{id}")
    public ResponseEntity<NewEmployeeDto> updateEmployee(@RequestBody NewEmployeeDto newEmployeeDto, @PathVariable Long id){
        return new ResponseEntity<>(employeeService.updateEmployee(newEmployeeDto,id),HttpStatus.OK);
    }
}
