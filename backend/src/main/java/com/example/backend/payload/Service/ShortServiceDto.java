package com.example.backend.payload.Service;

import com.example.backend.model.constants.ServiceStatus;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortServiceDto {
    private long id;
    @NotEmpty(message = "description should not be empty")
    private String description;

    @NotEmpty(message = "cost should not be empty")
    private String cost;

    private ServiceStatus serviceStatus;
}
