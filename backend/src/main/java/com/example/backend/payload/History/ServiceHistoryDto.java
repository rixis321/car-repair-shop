package com.example.backend.payload.History;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceHistoryDto {
    private long id;

    private String description;
    private Instant date;
    private String fullEmployeeName;
}
