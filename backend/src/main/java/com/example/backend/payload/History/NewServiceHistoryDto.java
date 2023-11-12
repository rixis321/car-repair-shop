package com.example.backend.payload.History;

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
public class NewServiceHistoryDto {
    private long id;
    @NotEmpty(message = "description should not be empty")
    private String description;
    private Instant date;
}
