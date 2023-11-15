package com.example.backend.service;

import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;

import java.util.List;

public interface InvoiceService {

    List<ShortInvoiceDto> getAllInvoices();

    InvoiceDto getInvoiceById(Long invoiceId);
}
