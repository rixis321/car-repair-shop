package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Employee;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.mapper.EmployeeMapper;
import com.example.backend.payload.mapper.ServiceMapper;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.ServiceHistoryRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.service.EmployeeService;
import com.example.backend.validator.UserDataValidator;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class EmployeeServiceImpl  implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final UserDataValidator userDataValidator;
    private final ServiceHistoryRepository serviceHistoryRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;

    private final PasswordEncoder passwordEncoder;
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper, UserDataValidator userDataValidator, ServiceHistoryRepository serviceHistoryRepository, ServiceRepository serviceRepository, ServiceMapper serviceMapper, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.userDataValidator = userDataValidator;
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceRepository = serviceRepository;
        this.serviceMapper = serviceMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",id));

        EmployeeDto employeeDto = employeeMapper.mapToEmployeeDto(employee);
       List<NewServiceHistoryDto> history = employee.getServiceHistories()
                .stream()
                .map(serviceHistory ->{
                            NewServiceHistoryDto serviceHistoryDto = serviceMapper.mapToNewServiceHistoryDto(serviceHistory);
                            Long serviceId = serviceRepository.findServiceIdByServiceHistoryId(serviceHistory.getId())
                                    .orElseThrow(()->new ResourceNotFoundException("Service history","id", serviceHistory.getId()));
                            serviceHistoryDto.setServiceId(serviceId);
                            return serviceHistoryDto;
                        }

                        )
               .toList();


        employeeDto.setServiceHistory(history);
        return employeeDto;
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

    @Override
    public String updateEmployeePassword(long employeeId,String password) {
        log.info(password);
        Employee employee = employeeRepository
                .findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("employee","id",employeeId));

        try{
            userDataValidator.validatePassword(password);
            employee.setPassword(password);
            employee.setPassword(passwordEncoder.encode(employee.getPassword()));
            employee = employeeRepository.save(employee);

            String storedPassword = employee.getPassword();
            boolean passwordMatch = passwordEncoder.matches(password,storedPassword);
            log.info(String.valueOf(passwordMatch));
            return "Password changed successfully";
        }catch (CarRepairShopApiException | ValidationException e){
            log.error(e.getMessage());
            throw e;
        }

//        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
//        employee = employeeRepository.save(employee);
       // employee.setPassword(passwordEncoder.encode(password));

    }
}
