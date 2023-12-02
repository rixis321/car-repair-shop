package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.*;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import com.example.backend.payload.Service.ServiceDto;
import com.example.backend.payload.Service.ShortServiceDto;
import com.example.backend.payload.mapper.InvoiceMapper;
import com.example.backend.payload.mapper.ServiceMapper;
import com.example.backend.repository.*;
import com.example.backend.service.RepairService;
import com.example.backend.utils.InvoiceNumberGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RepairServiceImpl implements RepairService {
    private final EmployeeRepository employeeRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final ServiceHistoryRepository serviceHistoryRepository;
    private final ServiceMapper serviceMapper;
    private final ServiceRepository serviceRepository;
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final InvoiceMapper invoiceMapper;

    public RepairServiceImpl(EmployeeRepository employeeRepository, DiagnosisRepository diagnosisRepository, ServiceHistoryRepository serviceHistoryRepository, ServiceMapper serviceMapper, ServiceRepository serviceRepository, InvoiceRepository invoiceRepository, CustomerRepository customerRepository, InvoiceMapper invoiceMapper) {
        this.employeeRepository = employeeRepository;
        this.diagnosisRepository = diagnosisRepository;
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceMapper = serviceMapper;
        this.serviceRepository = serviceRepository;
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
        this.invoiceMapper = invoiceMapper;
    }

    @Override
    public ShortServiceDto addService(ShortServiceDto shortServiceDto, Long employeeId, Long diagnosisId) {
        Diagnosis diagnosis = diagnosisRepository
                .findById(diagnosisId)
                .orElseThrow(()->new ResourceNotFoundException("Diagnosis","id",diagnosisId));
        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(()->new ResourceNotFoundException("Employee","id",employeeId));

        if(checkIfStringIsNumber(shortServiceDto.getCost()) && diagnosis.getClientApproval() == ClientApproval.ZATWIERDZONO){
            com.example.backend.model.Service service = serviceMapper.mapToService(shortServiceDto);
            service.setEmployee(employee);
            service.setDiagnosis(diagnosis);

            ServiceHistory serviceHistory = new ServiceHistory();
            Instant instant = Instant.now();
            serviceHistory.setDate(instant);
            serviceHistory.setDescription("Wprowadzono do systemu");
            serviceHistory.setEmployee(employee);

            service.setServiceStatus(ServiceStatus.ROZPOCZETO);
            service = serviceRepository.save(service);

            serviceHistory.setService(service);
            serviceHistoryRepository.save(serviceHistory);

            return serviceMapper.mapToShortServiceDto(service);
        }
        else{
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Service add error");
        }
    }

    @Override
    public List<ShortServiceDto> getAllServices() {
        return serviceRepository
                .findAll()
                .stream()
                .map(serviceMapper::mapToShortServiceDto)
                .toList();
    }

    @Override
    public List<ShortServiceDto> getServicesByStatus(ServiceStatus serviceStatus) {

        return serviceRepository
                .findByServiceStatus(serviceStatus)
                .stream()
                .map(serviceMapper::mapToShortServiceDto)
                .toList();
    }

    @Override
    public ServiceDto getServiceById(Long serviceId) {
       com.example.backend.model.Service service = serviceRepository
               .findById(serviceId)
               .orElseThrow(()->new ResourceNotFoundException("Service","id",serviceId));

        Set<ShortInvoiceDto> invoices = invoiceRepository.findByServiceId(serviceId)
                .stream().map(invoiceMapper::mapToShortInvoiceDto).collect(Collectors.toSet());


        ServiceDto serviceDto = new ServiceDto();
        serviceDto.setInvoices(invoices);
        serviceDto.setCarId(service.getDiagnosis().getCar().getId());
        serviceDto.setServiceStatus(service.getServiceStatus());

      List<ServiceHistoryDto> history = service.getServiceHistories()
              .stream()
              .map(serviceMapper::mapToServiceHistoryDto)
              .toList();
         serviceDto.setServiceHistory(history);
         serviceDto.setDescription(service.getDescription());
         serviceDto.setId(service.getId());
         serviceDto.setCost(service.getCost());
          return serviceDto;


    }

    @Override
    public ShortServiceDto updateServiceStatus(Long serviceId, ServiceStatus serviceStatus) {
        com.example.backend.model.Service service = serviceRepository
                .findById(serviceId)
                .orElseThrow(()->new ResourceNotFoundException("Service","id",serviceId));

        service.setServiceStatus(serviceStatus);
        service = serviceRepository.save(service);
        if(serviceStatus.equals(ServiceStatus.OCZEKUJE_NA_KLIENTA)){
            Invoice invoice = new Invoice();
            invoice.setInvoiceNumber(InvoiceNumberGenerator.generateInvoiceNumber());
            invoice.setIssueDate(Instant.now());

            invoice.setService(service);
            invoice = invoiceRepository.save(invoice);
        }
        return serviceMapper.mapToShortServiceDto(service);
    }


    @Override
    public ShortServiceDto updateService(ShortServiceDto shortServiceDto, Long serviceId) {
        com.example.backend.model.Service service = serviceRepository
                .findById(serviceId)
                .orElseThrow(()->new ResourceNotFoundException("Service","id",serviceId));

        if(shortServiceDto.getServiceStatus() == null){
            throw new CarRepairShopApiException(HttpStatus.NOT_FOUND,"Service status not found");
        }else{
            if(checkIfStringIsNumber(shortServiceDto.getCost())){
                com.example.backend.model.Service updatedService = serviceMapper.mapToService(shortServiceDto);
                updatedService.setId(service.getId());
                updatedService.setServiceHistories(service.getServiceHistories());
                updatedService.setEmployee(service.getEmployee());
                updatedService.setInvoices(service.getInvoices());
                updatedService.setDiagnosis(service.getDiagnosis());

                updatedService = serviceRepository.save(updatedService);
                return serviceMapper.mapToShortServiceDto(updatedService);

            }else{
                throw new ValidationException("Cost");
            }
        }

    }

    @Override
    public List<ShortServiceDto> getCustomerServices(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()->new ResourceNotFoundException("Customer","id",customerId));

        return customer.getCars()
                .stream()
                .flatMap(car -> car.getDiagnoses().stream())
                .filter(diagnosis -> diagnosis.getService() != null)
                .filter(diagnosis -> isDesiredStatus(diagnosis.getService().getServiceStatus()))
                .map(diagnosis -> serviceMapper.mapToShortServiceDto(diagnosis.getService()))
                .toList();

    }
    private boolean isDesiredStatus(ServiceStatus status) {
        return status == ServiceStatus.ROZPOCZETO
                || status == ServiceStatus.W_TRAKCIE
                || status == ServiceStatus.OCZEKUJE_NA_KLIENTA;
    }

    private boolean checkIfStringIsNumber(String str){
        if(str == null || str.length() == 0){
            return false;
        }try {
            double d = Double.parseDouble(str);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }
}
