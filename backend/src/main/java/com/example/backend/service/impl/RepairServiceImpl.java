package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Diagnosis;
import com.example.backend.model.Employee;
import com.example.backend.model.Invoice;
import com.example.backend.model.ServiceHistory;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.Service.ServiceDto;
import com.example.backend.payload.Service.ShortServiceDto;
import com.example.backend.payload.mapper.ServiceMapper;
import com.example.backend.repository.*;
import com.example.backend.service.RepairService;
import com.example.backend.utils.InvoiceNumberGenerator;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class RepairServiceImpl implements RepairService {
    private final EmployeeRepository employeeRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final ServiceHistoryRepository serviceHistoryRepository;
    private final ServiceMapper serviceMapper;
    private final ServiceRepository serviceRepository;
    private final InvoiceRepository invoiceRepository;

    public RepairServiceImpl(EmployeeRepository employeeRepository, DiagnosisRepository diagnosisRepository, ServiceHistoryRepository serviceHistoryRepository, ServiceMapper serviceMapper, ServiceRepository serviceRepository, InvoiceRepository invoiceRepository) {
        this.employeeRepository = employeeRepository;
        this.diagnosisRepository = diagnosisRepository;
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceMapper = serviceMapper;
        this.serviceRepository = serviceRepository;
        this.invoiceRepository = invoiceRepository;
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

       return serviceMapper.mapToServiceDto(service);


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
