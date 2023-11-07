package com.example.backend.payload.Diagnosis;

import com.example.backend.model.constants.ClientApproval;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewDiagnosisDto {
    private long id;
    @NotEmpty(message = "car id should not be empty")
    private long carId;
    @NotEmpty(message = "employee id should not be empty")
    private long employeeId;
    @NotEmpty(message = "diagnosis date should not be empty")
    private Instant diagnosisDate;
    @NotEmpty(message = "description should not be empty")
    private String description;

    @NotEmpty(message = "cost should not be empty")
    private String estimatedCost;
    @NotEmpty(message = "diagnosis status should not be empty")
    private ClientApproval clientApproval;
}
