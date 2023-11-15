package com.example.backend.controller;

import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.service.InvoiceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }
@GetMapping("/invoices")
    ResponseEntity<List<InvoiceDto>> getAllInvoices(){
        return new ResponseEntity<>(invoiceService.getAllInvoices(), HttpStatus.OK);
    }
}
