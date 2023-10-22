package com.example.backend.payload;

import com.example.backend.model.UserAddress;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUserDto {

    private long id;
   @NotEmpty(message = "Name should not be null or empty")
    private String name;
    @NotEmpty(message = "lastname should not be null or empty")
    private String lastname;
    @NotEmpty(message = "phone number should not be null or empty")
    private String phone;
    @NotEmpty(message = "accessCode cannot be empty or null")
    private String accessCode;

    @NotNull(message = "user address should not be null")
    private UserAddress userAddress;
}
