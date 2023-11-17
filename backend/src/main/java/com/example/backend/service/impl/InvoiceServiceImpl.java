package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Invoice;
import com.example.backend.model.Service;
import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import com.example.backend.payload.Service.ServiceWithoutInvoices;
import com.example.backend.payload.mapper.InvoiceMapper;
import com.example.backend.payload.mapper.ServiceMapper;
import com.example.backend.repository.InvoiceRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.service.InvoiceService;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
@org.springframework.stereotype.Service
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;
    private final InvoiceMapper invoiceMapper;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, ServiceRepository serviceRepository, ServiceMapper serviceMapper, InvoiceMapper invoiceMapper) {
        this.invoiceRepository = invoiceRepository;
        this.serviceRepository = serviceRepository;
        this.serviceMapper = serviceMapper;
        this.invoiceMapper = invoiceMapper;
    }

    @Override
    public List<ShortInvoiceDto> getAllInvoices() {
        return invoiceRepository
                .findAll()
                .stream()
                .map((invoice)->{
                    Service service = serviceRepository.findById(invoice.getService().getId())
                            .orElseThrow(()-> new ResourceNotFoundException("Service","id", invoice.getService().getId()));
                    ShortInvoiceDto shortInvoiceDto = invoiceMapper.mapToShortInvoiceDto(invoice);
                    shortInvoiceDto.setFullCarName(service.getDiagnosis().getCar().getBrand()
                            + " "+ service.getDiagnosis().getCar().getModel());
                    shortInvoiceDto.setFullOwnerName(service.getDiagnosis().getCar().getCustomer().getName()
                            + " " + service.getDiagnosis().getCar().getCustomer().getLastname());
                    return shortInvoiceDto;
                })
                .toList();

    }

    @Override
    public InvoiceDto getInvoiceById(Long invoiceId) {
        Invoice invoice = invoiceRepository
                .findById(invoiceId).
                orElseThrow(()->new ResourceNotFoundException("Invoice","id",invoiceId));
        ServiceWithoutInvoices service = serviceMapper.mapToServiceWithoutInvoices(invoice.getService());
        InvoiceDto invoiceDto = invoiceMapper.mapToInvoiceDto(invoice);
        invoiceDto.setService(service);
        return invoiceDto;
    }
}
