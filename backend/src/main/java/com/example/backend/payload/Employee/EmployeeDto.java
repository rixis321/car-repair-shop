package com.example.backend.payload.Employee;

import com.example.backend.model.Diagnosis;
import com.example.backend.model.Role;
import com.example.backend.model.Service;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.UserAddressDto;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

public class EmployeeDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = false)
    private String phone;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private UserAddressDto userAddressDto;
    private List<Diagnosis> diagnoses;
    private List<Service> services;
    private Set<Role> roles;
}
