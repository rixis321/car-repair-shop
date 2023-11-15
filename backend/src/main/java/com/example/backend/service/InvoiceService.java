package com.example.backend.service;

import com.example.backend.payload.Invoice.ShortInvoiceDto;
import com.example.backend.payload.Invoice.InvoiceDto;

import java.util.List;

public interface InvoiceService {

    List<InvoiceDto> getAllInvoices();

    ShortInvoiceDto getInvoiceById(Long invoiceId);


}
