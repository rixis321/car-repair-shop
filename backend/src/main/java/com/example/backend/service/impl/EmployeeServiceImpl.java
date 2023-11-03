package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Employee;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.payload.mapper.EmployeeMapper;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.service.EmployeeService;
import com.example.backend.validator.UserDataValidator;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl  implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final UserDataValidator userDataValidator;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper, UserDataValidator userDataValidator) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.userDataValidator = userDataValidator;
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",id));

        return employeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<ShortEmployeeDto> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::mapToShortEmployeeDto)
                .filter((employee) ->
                        employee.getRoles()
                                .stream()
                                .noneMatch(role -> role.getName().equalsIgnoreCase("ADMIN"))
                )
                .toList();
    }

    @Override
    public NewEmployeeDto updateEmployee(NewEmployeeDto employeeDto, Long employeeId) {
        Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));
        Employee updatedEmployee = new Employee();
        try{
            userDataValidator.validateEmployeeUpdatedData(employeeDto);
            if(!employeeDto.getPhone().equals(employee.getPhone())){
                userDataValidator.validatePhoneNumber(employeeDto.getPhone(),"employee");
                if(!employeeDto.getEmail().equals(employee.getEmail())){
                    userDataValidator.validateEmail(employeeDto.getEmail());
                }
            }
            updatedEmployee = employeeMapper.mapToEmployee(employeeDto);
            updatedEmployee.setId(employee.getId());
            updatedEmployee.setServices(employee.getServices());
            updatedEmployee.setDiagnoses(employee.getDiagnoses());
            updatedEmployee.setRoles(employee.getRoles());

            updatedEmployee.getUserAddress().setId(employee.getUserAddress().getId());
            updatedEmployee.getUserAddress().setEmployee(employee);

            updatedEmployee.setPassword(employee.getPassword());
            updatedEmployee = employeeRepository.save(updatedEmployee);

            return employeeMapper.mapToNewEmployeeDto(updatedEmployee);
        }catch (CarRepairShopApiException | ValidationException e){
            logger.error(e.getMessage());
            throw e;
        }


    }

    @Override
    public String deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));

        return "Employee deleted successfully";
    }
}
