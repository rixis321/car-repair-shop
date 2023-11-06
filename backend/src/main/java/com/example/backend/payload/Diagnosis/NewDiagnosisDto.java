package com.example.backend.payload.Diagnosis;

import com.example.backend.model.constants.ClientApproval;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewDiagnosisDto {
    private long id;
    @Column(nullable = false)
    private long carId;
    @Column(nullable = false)
    private long employeeId;
    @Column(name = "diagnosis_date",nullable = false)
    private Instant diagnosisDate;
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String estimatedCost;

    private ClientApproval clientApproval;
}
