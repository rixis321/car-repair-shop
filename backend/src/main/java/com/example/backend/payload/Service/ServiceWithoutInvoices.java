package com.example.backend.payload.Service;

import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.History.ServiceHistoryDto;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
// klasa do pobrania faktury
public class ServiceWithoutInvoices {
    private long id;
    @NotEmpty(message = "description should not be empty")
    private String description;

    @NotEmpty(message = "cost should not be empty")
    private String cost;
    @NotEmpty(message = "service status should not be empty")
    private ServiceStatus serviceStatus;

    private List<ServiceHistoryDto> serviceHistory;
}
