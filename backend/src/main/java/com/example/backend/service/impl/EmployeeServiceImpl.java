package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Employee;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.service.EmployeeService;
import com.example.backend.validator.UserDataValidator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl  implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    private final UserDataValidator userDataValidator;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper, UserDataValidator userDataValidator) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
        this.userDataValidator = userDataValidator;
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
                .map((emp) -> modelMapper.map(emp, ShortEmployeeDto.class))
                .filter((employee) ->
                        employee.getRoles()
                                .stream()
                                .noneMatch(role -> role.getName().equalsIgnoreCase("ADMIN"))
                )
                .toList();
    }

    @Override
    public NewEmployeeDto updateEmployee(NewEmployeeDto employeeDto, Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));

        Employee updatedEmployee = new Employee();

        if(userDataValidator.validateEmployeeUpdatedData(employeeDto)){
            if(!employeeDto.getPhone().equals(employee.getPhone())){
                if(userDataValidator.validatePhoneNumber(employeeDto.getPhone(),"employee")){
                    if(!employeeDto.getEmail().equals(employee.getEmail())){
                        if(userDataValidator.validateEmail(employeeDto.getEmail())){
                            updatedEmployee = modelMapper.map(employeeDto, Employee.class);
                        }else
                            throw new ValidationException("Email");
                    }else
                        throw new ValidationException("Phone number");
                }
            }else
                updatedEmployee = modelMapper.map(employeeDto, Employee.class);
        }
        updatedEmployee.setId(employee.getId());
        updatedEmployee.setServices(employee.getServices());
        updatedEmployee.setDiagnoses(employee.getDiagnoses());
        updatedEmployee.setRoles(employee.getRoles());

        updatedEmployee.getUserAddress().setId(employee.getUserAddress().getId());
        updatedEmployee.getUserAddress().setEmployee(employee);

        updatedEmployee.setPassword(employee.getPassword());

        updatedEmployee = employeeRepository.save(updatedEmployee);
        return modelMapper.map(updatedEmployee, NewEmployeeDto.class);
    }

    @Override
    public String deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));

        return "Employee deleted successfully";
    }
}
