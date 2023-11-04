package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Employee;
import com.example.backend.model.Role;
import com.example.backend.payload.Employee.LoginDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.mapper.EmployeeMapper;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserAddressRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.AuthService;
import com.example.backend.utils.StringCapitalizer;
import com.example.backend.validator.UserDataValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {
    private final EmployeeMapper employeeMapper;
    private final AuthenticationManager authenticationManager;
    private final EmployeeRepository employeeRepository;

    private final RoleRepository roleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserDataValidator userDataValidator;

    private final UserAddressRepository userAddressRepository;
    public AuthServiceImpl(EmployeeMapper employeeMapper, AuthenticationManager authenticationManager,
                           EmployeeRepository employeeRepository, RoleRepository roleRepository,
                           JwtTokenProvider jwtTokenProvider,
                           PasswordEncoder passwordEncoder, UserDataValidator userDataValidator, UserAddressRepository userAddressRepository) {
        this.employeeMapper = employeeMapper;
        this.authenticationManager = authenticationManager;
        this.employeeRepository = employeeRepository;

        this.roleRepository = roleRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.userDataValidator = userDataValidator;
        this.userAddressRepository = userAddressRepository;
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
        Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
        try {
            userDataValidator.validateEmployeeData(newEmployeeDto);
            newEmployeeDto.setName(StringCapitalizer.capitalizeFirstLetter(newEmployeeDto.getName()));
            newEmployeeDto.setLastname(StringCapitalizer.capitalizeFirstLetter(newEmployeeDto.getLastname()));
            newEmployeeDto.getUserAddressDto().setCity(StringCapitalizer
                    .capitalizeFirstLetter(newEmployeeDto.getUserAddressDto().getCity()));

            Employee employee = employeeMapper.mapToEmployee(newEmployeeDto);
            Set<Role> roles = new HashSet<>();
            Role employeeRole = roleRepository.findByName(newEmployeeDto.getRole());
            roles.add(employeeRole);
            employee.setRoles(roles);
            employee = employeeRepository.save(employee);
            return employeeMapper.mapToNewEmployeeDto(employee);
        } catch (CarRepairShopApiException | ValidationException e) {
            logger.error(e.getMessage());
            throw e;
        }
    }


}
