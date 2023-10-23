package com.example.backend.service;

import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewUserDto;

public interface AuthService {

    String login(LoginDto loginDto);

    NewUserDto register(NewUserDto newUserDto);
}
