package com.example.backend.payload.Car;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarInfoDto {
    private long id;
    @NotEmpty(message = "Brand should not be null or empty")
    private int productionYear;
    @NotEmpty(message = "Brand should not be null or empty")
    private String gearboxType;
    @NotEmpty(message = "Brand should not be null or empty")
    private String fuelType;

    private String engine;
    @NotEmpty(message = "Brand should not be null or empty")
    private String vinNumber;
}
