package com.example.backend.controller;

import com.example.backend.payload.JwtAuthResponse;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewUserDto;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<NewUserDto> register(@RequestBody NewUserDto newUserDto){
        return new ResponseEntity<>(authService.register(newUserDto), HttpStatus.CREATED);
    }
}
