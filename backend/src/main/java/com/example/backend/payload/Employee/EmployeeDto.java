package com.example.backend.payload.Employee;

import com.example.backend.model.Diagnosis;
import com.example.backend.model.Role;
import com.example.backend.model.Service;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.payload.Service.ServiceWithoutInvoices;
import com.example.backend.payload.Service.ShortServiceDto;
import com.example.backend.payload.UserAddressDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private List<ShortDiagnosisDto> diagnoses;
    private List<ServiceWithoutInvoices> services;
    private Set<Role> roles;
}
