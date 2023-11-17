package com.example.backend.payload.Invoice;

import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.payload.Service.ServiceWithoutInvoices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDto {
    private long id;

    private Instant issueDate;

    private String invoiceNumber;

    private String fullOwnerName;
    private String fullCarName;

    private ShortDiagnosisDto diagnosis;
    private ServiceWithoutInvoices service;
}
