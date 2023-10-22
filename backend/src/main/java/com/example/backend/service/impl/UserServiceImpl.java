package com.example.backend.service.impl;

import com.example.backend.exception.ValidationException;
import com.example.backend.model.User;
import com.example.backend.payload.NewUserDto;
import com.example.backend.payload.UserDto;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.example.backend.utils.AccessCodeGenerator;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import org.modelmapper.ModelMapper;

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
    public NewUserDto addUser(NewUserDto newUserDto) {
    if(checkUserData(newUserDto)){
        newUserDto.setName(capitalizeString(newUserDto.getName()));
        newUserDto.setLastname(capitalizeString(newUserDto.getLastname()));
        newUserDto.getUserAddress().setCity(capitalizeString(newUserDto.getUserAddress().getCity()));

        User user = modelMapper.map(newUserDto,User.class);
        user.setAccessCode(AccessCodeGenerator.generateCode());

        User newUser = userRepository.save(user);
        return modelMapper.map(newUser, NewUserDto.class);
    }
        throw new ValidationException("User");
    }

    @Override
    public UserDto getUser(Long id) {
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

    public boolean checkUserData(NewUserDto newUserDto){
        return validateString(newUserDto.getName()) && validateString(newUserDto.getLastname())
                && validatePhoneNumber(newUserDto.getPhone()) && validateString(newUserDto.getUserAddress().getCity())
                && validateString(newUserDto.getUserAddress().getStreetName())
                && validateStreetNumber(newUserDto.getUserAddress().getStreetNumber())
                && validateZipCode(newUserDto.getUserAddress().getZipcode());

    }


    public boolean validateString(String name){
        if((name == null || name.isEmpty())|| !name.matches("^\\s*[a-zA-Z]+(\\s+[a-zA-Z]+)*\\s*$")){
            throw new ValidationException("String");
        }
        return  true;
    }
    public boolean validatePhoneNumber(String phoneNumber){
        String regex = "^\\s*[0-9]{3}\\s*[0-9]{3}\\s*[0-9]{3}\\s*$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);

        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("phoneNumber");
        }
    }

    public boolean validateZipCode(String zipcode){
        String regex = "^\\s*[0-9]{2}\\s*-\\s*[0-9]{3}\\s*$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(zipcode);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("zipcode");
        }
    }

    public boolean validateStreetNumber(String streetNumber){
        String regex = "^[a-zA-Z0-9]+$";
        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(streetNumber);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("streetNumber");
        }
    }
    public String capitalizeString(String text){
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }

}
