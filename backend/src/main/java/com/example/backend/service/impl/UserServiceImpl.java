package com.example.backend.service.impl;

import com.example.backend.payload.UserDto;
import com.example.backend.repository.UserAddressRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final CustomerRepository userRepository;
    private final UserAddressRepository userInfoRepository;

    public UserServiceImpl(ModelMapper modelMapper, CustomerRepository userRepository, UserAddressRepository userInfoRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public UserDto getUserById(Long id) {
        return null;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return null;
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long userId) {
        return null;
    }

    @Override
    public void deleteUser(Long userId) {

    }

}
