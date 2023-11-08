package com.example.backend.payload.Diagnosis;

import com.example.backend.model.constants.ClientApproval;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiagnosisWithEmployee {
    private long id;

    @NotEmpty(message = "diagnosis status should not be empty")
    private ClientApproval clientApproval;
    @NotEmpty(message = "employee full name should not be empty")
    private String fullNameOfEmployee;
    @NotEmpty(message = "diagnosis date should not be empty")
    private Instant diagnosisDate;
    @NotEmpty(message = "description should not be empty")
    private String description;
    @NotEmpty(message = "registration number should not be empty")
    private String registrationNumber;
}
