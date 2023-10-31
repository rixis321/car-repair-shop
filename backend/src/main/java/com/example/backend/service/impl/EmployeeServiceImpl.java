package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Employee;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class EmployeeServiceImpl  implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",id));

        return modelMapper.map(employee,EmployeeDto.class);
    }

    @Override
    public List<ShortEmployeeDto> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map((emp)-> modelMapper.map(emp, ShortEmployeeDto.class))
                .filter((employee)-> employee.getRole().equals("ADMIN"))
                .toList();
    }

    @Override
    public NewEmployeeDto updateEmployee(NewCustomerDto customerDto, Long customerId) {
        return null;
    }

    @Override
    public String deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));

        return "Employee deleted successfully";
    }
}
