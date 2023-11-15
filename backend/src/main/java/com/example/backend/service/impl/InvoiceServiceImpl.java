package com.example.backend.service.impl;

import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import com.example.backend.repository.InvoiceRepository;
import com.example.backend.service.InvoiceService;

import java.util.List;

public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public List<ShortInvoiceDto> getAllInvoices() {
        return null;
    }

    @Override
    public InvoiceDto getInvoiceById(Long invoiceId) {
        return null;
    }
}
