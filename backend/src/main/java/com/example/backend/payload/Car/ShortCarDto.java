package com.example.backend.payload.Car;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortCarDto {
    private long id;
    @NotEmpty(message = "Brand should not be null or empty")
    private String brand;
    @NotEmpty(message = "Model should not be null or empty")
    private String model;
    @NotEmpty(message = "Owner name should not be null or empty")
    private String fullOwnerName;
    @NotEmpty(message = "Registration number should not be null or empty")
    private String registrationNumber;
}
//marka, model, wlasciciel(imie+nazwisko), nr rejestracyjny