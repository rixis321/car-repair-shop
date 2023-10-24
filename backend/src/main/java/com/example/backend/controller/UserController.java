package com.example.backend.controller;

import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(CustomerRepository userRepository, UserService userService) {
        this.userService = userService;
    }


}
