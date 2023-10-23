package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.User;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.LoginDto;
import com.example.backend.payload.NewUserDto;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.AuthService;
import com.example.backend.utils.AccessCodeGenerator;
import org.modelmapper.ModelMapper;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AuthServiceImpl implements AuthService {
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    public AuthServiceImpl(ModelMapper modelMapper,
                           AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           JwtTokenProvider jwtTokenProvider,
                           PasswordEncoder passwordEncoder) {
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getPhoneNumber(),loginDto.getAccessCode()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

    @Override
    public NewUserDto register(NewUserDto newUserDto) {
        if(checkUserData(newUserDto)){
            newUserDto.setName(capitalizeString(newUserDto.getName()));
            newUserDto.setLastname(capitalizeString(newUserDto.getLastname()));
            newUserDto.getUserAddress().setCity(capitalizeString(newUserDto.getUserAddress().getCity()));

            User user = mapToEntity(newUserDto);
            user.getUserAddress().setUser(user);
            user = userRepository.save(user);
            return modelMapper.map(user, NewUserDto.class);
        }
        throw new ValidationException("User");
    }


    private User mapToEntity(NewUserDto newUserDto){
        User user = new User();
        UserAddress userAddress = modelMapper.map(newUserDto.getUserAddress(),UserAddress.class);
        user.setUserAddress(userAddress);
        user.setName(newUserDto.getName());
        user.setLastname(newUserDto.getLastname());
        user.setPhone(newUserDto.getPhone());


        user.setAccessCode(AccessCodeGenerator.generateCode());
        System.out.println(user.getAccessCode());
        user.setAccessCode(passwordEncoder.encode(user.getAccessCode()));
        return user;
    }

    private boolean checkUserData(NewUserDto newUserDto){
        return validateString(newUserDto.getName()) && validateString(newUserDto.getLastname())
                && validatePhoneNumber(newUserDto.getPhone()) && validateString(newUserDto.getUserAddress().getCity())
                && validateString(newUserDto.getUserAddress().getStreetName())
                && validateStreetNumber(newUserDto.getUserAddress().getStreetNumber())
                && validateZipCode(newUserDto.getUserAddress().getZipcode());

    }


    private boolean validateString(String name){
        if((name == null || name.isEmpty())|| !name.matches("^\\s*[a-zA-Z]+(\\s+[a-zA-Z]+)*\\s*$")){
            throw new ValidationException("String");
        }
        return  true;
    }
    private boolean validatePhoneNumber(String phoneNumber){
        String regex = "^\\s*[0-9]{3}\\s*[0-9]{3}\\s*[0-9]{3}\\s*$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);

        if(matcher.matches()){
            if(userRepository.existsByPhone(phoneNumber)){
                throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"account with that phone number already exists");
            }else
                return true;
        }else{
            throw new ValidationException("phoneNumber");
        }
    }

    private boolean validateZipCode(String zipcode){
        String regex = "^\\s*[0-9]{2}\\s*-\\s*[0-9]{3}\\s*$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(zipcode);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("zipcode");
        }
    }

    private boolean validateStreetNumber(String streetNumber){
        String regex = "^[a-zA-Z0-9]+$";
        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(streetNumber);
        if(matcher.matches()){
            return true;
        }else{
            throw new ValidationException("streetNumber");
        }
    }
    private String capitalizeString(String text){
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }
}
