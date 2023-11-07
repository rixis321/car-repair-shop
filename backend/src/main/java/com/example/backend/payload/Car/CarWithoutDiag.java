package com.example.backend.payload.Car;

import com.example.backend.model.Diagnosis;
import com.example.backend.model.constants.CarType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarWithoutDiag {
    private long id;
    private String brand;
    private String model;
    private String registrationNumber;
    private CarType type;
    private CarInfoDto carInfoDto;

}
