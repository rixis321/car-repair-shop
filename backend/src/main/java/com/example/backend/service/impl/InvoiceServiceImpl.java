package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Service;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.payload.mapper.InvoiceMapper;
import com.example.backend.repository.InvoiceRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.service.InvoiceService;

import java.util.List;
@org.springframework.stereotype.Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ServiceRepository serviceRepository;
    private final InvoiceMapper invoiceMapper;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, ServiceRepository serviceRepository,InvoiceMapper invoiceMapper) {
        this.invoiceRepository = invoiceRepository;
        this.serviceRepository = serviceRepository;
        this.invoiceMapper = invoiceMapper;
    }

    @Override
    public List<InvoiceDto> getAllInvoices() {
        return invoiceRepository
                .findAll()
                .stream()
                .map((invoice)->{
                    Service service = serviceRepository.findById(invoice.getService().getId())
                            .orElseThrow(()-> new ResourceNotFoundException("Service","id", invoice.getService().getId()));
                    InvoiceDto invoiceDto = invoiceMapper.mapToShortInvoiceDto(invoice);
                    invoiceDto.setFullCarName(service.getDiagnosis().getCar().getBrand()
                            + " "+ service.getDiagnosis().getCar().getModel());
                    invoiceDto.setFullOwnerName(service.getDiagnosis().getCar().getCustomer().getName()
                            + " " + service.getDiagnosis().getCar().getCustomer().getLastname());
                    return invoiceDto;
                })
                .toList();

    }

    @Override
    public ShortInvoiceDto getInvoiceById(Long invoiceId) {
        return null;
    }
}
