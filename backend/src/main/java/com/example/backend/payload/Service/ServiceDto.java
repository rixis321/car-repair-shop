package com.example.backend.payload.Service;

import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDto {
    private long id;

    private long carId;
    @NotEmpty(message = "description should not be empty")
    private String description;

    @NotEmpty(message = "cost should not be empty")
    private String cost;
    @NotEmpty(message = "service status should not be empty")
    private ServiceStatus serviceStatus;

    private List<ServiceHistoryDto> serviceHistory;

    private Set<ShortInvoiceDto> invoices;
}
