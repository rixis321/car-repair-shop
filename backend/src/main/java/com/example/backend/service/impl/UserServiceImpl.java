package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.User;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewUserDto;
import com.example.backend.payload.UserAddressDto;
import com.example.backend.payload.UserDto;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.example.backend.utils.AccessCodeGenerator;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import org.modelmapper.ModelMapper;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    public UserServiceImpl(ModelMapper modelMapper, UserRepository userRepository, UserInfoRepository userInfoRepository) {
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
