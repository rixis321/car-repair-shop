package com.example.backend.payload;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressDto {
    private long id;
    @NotEmpty(message = "city cannot be empty or null")
    private String city;
    @NotEmpty(message = "zipcode cannot be empty or null")
    private String zipcode;
    @NotEmpty(message = "street number cannot be empty or null")
    private String streetNumber;
    @NotEmpty(message = "street name cannot be empty or null")
    private String streetName;
}
