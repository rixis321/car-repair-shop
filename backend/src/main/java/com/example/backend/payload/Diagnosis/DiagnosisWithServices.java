package com.example.backend.payload.Diagnosis;

import com.example.backend.payload.Service.ServiceWithoutInvoices;
import com.example.backend.payload.Service.ShortServiceDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiagnosisWithServices {

    List<ShortDiagnosisDto> diagnosis;

    List<ServiceWithoutInvoices> services;
}
