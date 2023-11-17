package com.example.backend.payload.Car;

import com.example.backend.model.constants.CarType;
import com.example.backend.payload.Diagnosis.DiagnosisWithEmployee;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.payload.Service.ShortServiceDto;
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
    private CarInfoDto carInfoDto;
    private List<ShortDiagnosisDto> diagnoses;

    private List<ShortServiceDto> services;
}
