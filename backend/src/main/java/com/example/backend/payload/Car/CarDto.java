package com.example.backend.payload.Car;

import com.example.backend.model.CarInfo;
import com.example.backend.model.Customer;
import com.example.backend.model.Diagnosis;
import com.example.backend.model.constants.CarType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDto {
    private long id;
    private String brand;
    private String model;
    private String registrationNumber;
    private CarType type;
    private Customer customer;
    private CarInfo carInfo;
    private List<Diagnosis> diagnoses;
}
