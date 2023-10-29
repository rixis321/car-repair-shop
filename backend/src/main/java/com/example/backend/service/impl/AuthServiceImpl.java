package com.example.backend.service.impl;

import com.example.backend.exception.ValidationException;
import com.example.backend.model.Employee;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewEmployeeDto;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserAddressRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.AuthService;
import com.example.backend.utils.StringCapitalizer;
import com.example.backend.utils.UserDataValidator;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final EmployeeRepository employeeRepository;

    private final RoleRepository roleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserDataValidator userDataValidator;
    public AuthServiceImpl(ModelMapper modelMapper,
                           AuthenticationManager authenticationManager,
                           EmployeeRepository employeeRepository, RoleRepository roleRepository,
                           JwtTokenProvider jwtTokenProvider,
                           PasswordEncoder passwordEncoder, UserDataValidator userDataValidator) {
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
        this.employeeRepository = employeeRepository;

        this.roleRepository = roleRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.userDataValidator = userDataValidator;
    }

    @Override
    public String loginEmployee(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),loginDto.getPassword()
        ));
        Employee employee = employeeRepository.findByEmail(loginDto.getEmail()).orElseThrow(
                ()-> new UsernameNotFoundException("User not found with that email"));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication,employee.getId());
    }

    @Override
    public NewEmployeeDto registerEmployee(NewEmployeeDto newEmployeeDto) {
        if(userDataValidator.checkEmployeeData(newEmployeeDto)){
            newEmployeeDto.setName(StringCapitalizer.capitalizeFirstLetter(newEmployeeDto.getName()));
            newEmployeeDto.setLastname(StringCapitalizer.capitalizeFirstLetter(newEmployeeDto.getLastname()));
            newEmployeeDto.getUserAddress().setCity(StringCapitalizer.capitalizeFirstLetter(newEmployeeDto.getUserAddress().getCity()));

            Employee employee = mapToEntity(newEmployeeDto);
            employee = employeeRepository.save(employee);
            return modelMapper.map(employee, NewEmployeeDto.class);
        }
        throw new ValidationException("Customer");
    }


    private Employee mapToEntity(NewEmployeeDto newEmployeeDto){
        Employee employee = new Employee();
        UserAddress userAddress = modelMapper.map(newEmployeeDto.getUserAddress(),UserAddress.class);
        //userAddress = userAddressRepository.save(userAddress);

        employee.setUserAddress(userAddress);
        employee.setName(newEmployeeDto.getName());
        employee.setLastname(newEmployeeDto.getLastname());
        employee.setPhone(newEmployeeDto.getPhone());
        employee.setPassword(passwordEncoder.encode(newEmployeeDto.getPassword()));
        employee.setEmail(newEmployeeDto.getEmail());
        employee.getUserAddress().setEmployee(employee);
        return employee;
    }

}
