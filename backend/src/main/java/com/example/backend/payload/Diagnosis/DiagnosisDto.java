package com.example.backend.payload.Diagnosis;

import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Car.CarWithoutDiag;
import com.example.backend.payload.Service.ShortServiceDto;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiagnosisDto {
    private long id;
    @NotEmpty(message = "diagnosis date should not be empty")
    private Instant diagnosisDate;
    @NotEmpty(message = "description should not be empty")
    private String description;
    @NotEmpty(message = "cost should not be empty")
    private String estimatedCost;
    private ClientApproval clientApproval;

    private CarWithoutDiag car;

    private ShortServiceDto service;

}
