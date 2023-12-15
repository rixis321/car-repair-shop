package com.example.backend.payload.Customer;

import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.payload.Service.ServiceWithoutInvoices;
import com.example.backend.payload.Service.ShortServiceDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientData {
    private long id;
    private List<ShortDiagnosisDto> diagnosis;

    private List<ServiceWithoutInvoices> services;
}
