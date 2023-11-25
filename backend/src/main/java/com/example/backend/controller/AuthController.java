package com.example.backend.controller;

import com.example.backend.payload.JwtAuthResponse;
import com.example.backend.payload.Employee.LoginDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.service.AuthService;
import com.example.backend.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(CustomerService customerService, AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<String> loginEmployee(@RequestBody LoginDto loginDto){
        String token = authService.loginEmployee(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok()
                .body("Bearer "+ jwtAuthResponse.getAccessToken());
    }

    @PostMapping("/register")
    public ResponseEntity<NewEmployeeDto> registerEmployee(@RequestBody NewEmployeeDto newEmployeeDto){
        return new ResponseEntity<>(authService.registerEmployee(newEmployeeDto), HttpStatus.CREATED);
    }
}
