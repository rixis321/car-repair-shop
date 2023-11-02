package com.example.backend.payload.Employee;

import com.example.backend.model.Role;
import com.example.backend.payload.UserAddressDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class NewEmployeeDto {
    private long id;
    @NotEmpty(message = "Name should not be null or empty")
    private String name;
    @NotEmpty(message = "lastname should not be null or empty")
    private String lastname;
    @NotEmpty(message = "phone number should not be null or empty")
    private String phone;
    @NotEmpty(message = "roles cannot be null or empty")
    private String role;
    @NotEmpty(message = "Email should not be null or empty")
    private String email;
    @NotEmpty(message = "password should not be null or empty")
    private String password;
    @NotNull(message = "user address should not be null")
    private UserAddressDto userAddress;
}
