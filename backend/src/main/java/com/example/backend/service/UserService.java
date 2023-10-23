package com.example.backend.service;

import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewUserDto;
import com.example.backend.payload.UserDto;

import java.util.List;

public interface UserService {

    UserDto getUserById(Long id);

    List<UserDto> getAllUsers();

    UserDto updateUser(UserDto userDto, Long userId);

    void deleteUser(Long userId);
}
