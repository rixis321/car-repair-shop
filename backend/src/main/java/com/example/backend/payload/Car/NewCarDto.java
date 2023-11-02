package com.example.backend.payload.Car;

import com.example.backend.model.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class NewCarDto {

    private long id;
    @NotEmpty(message = "Brand should not be null or empty")
    private String brand;
    @NotEmpty(message = "Model should not be null or empty")
    private String model;
    @NotEmpty(message = "Registration number should not be null or empty")
    private String registrationNumber;
    @NotEmpty(message = "Type should not be null or empty")
    private String type;
    private CarInfoDto carInfoDto;
}
