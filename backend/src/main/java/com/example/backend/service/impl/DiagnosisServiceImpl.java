package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Car;
import com.example.backend.model.Customer;
import com.example.backend.model.Diagnosis;
import com.example.backend.model.Employee;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Diagnosis.*;
import com.example.backend.payload.mapper.DiagnosisMapper;
import com.example.backend.repository.CarRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.DiagnosisRepository;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.service.DiagnosisService;
import com.example.backend.service.SMSService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Slf4j
public class DiagnosisServiceImpl implements DiagnosisService {

    private final EmployeeRepository employeeRepository;
    private final CarRepository carRepository;

    private final DiagnosisMapper diagnosisMapper;
    private final DiagnosisRepository diagnosisRepository;

    private final CustomerRepository customerRepository;
    private final SMSService smsService;
    public DiagnosisServiceImpl(EmployeeRepository employeeRepository, CarRepository carRepository, DiagnosisMapper diagnosisMapper, DiagnosisRepository diagnosisRepository, CustomerRepository customerRepository, SMSService smsService) {
        this.employeeRepository = employeeRepository;
        this.carRepository = carRepository;
        this.diagnosisMapper = diagnosisMapper;
        this.diagnosisRepository = diagnosisRepository;
        this.customerRepository = customerRepository;
        this.smsService = smsService;
    }

    @Override
    public NewDiagnosisDto addDiagnosis(NewDiagnosisDto newDiagnosisDto) {

        Employee employee = employeeRepository.findById(newDiagnosisDto.getEmployeeId())
                .orElseThrow(()->new ResourceNotFoundException("Employee","id",newDiagnosisDto.getEmployeeId()));
        Car car = carRepository.findById(newDiagnosisDto.getCarId())
                .orElseThrow(()->new ResourceNotFoundException("Car","id",newDiagnosisDto.getCarId()));

        if(checkIfStringIsNumber(newDiagnosisDto.getEstimatedCost())){
            if(newDiagnosisDto.getDescription() == null || newDiagnosisDto.getDescription().isEmpty()){
                throw new ValidationException("Description");
            }
            Diagnosis diagnosis = diagnosisMapper.mapToDiagnosis(newDiagnosisDto);
            Instant date = Instant.now();
            diagnosis.setDiagnosisDate(date);
            diagnosis.setClientApproval(ClientApproval.OCZEKUJE);

            employee.getDiagnoses().add(diagnosis);
            car.getDiagnoses().add(diagnosis);

            diagnosis.setCar(car);
            diagnosis.setEmployee(employee);

            diagnosisRepository.save(diagnosis);
            carRepository.save(car);
            employeeRepository.save(employee);

            log.info(car.getCustomer().getAccessCode());
            String customerNumber = "+48" + car.getCustomer().getPhone();
            log.info(customerNumber);
            String message = "Status twojej diagnozy samochodu wymaga zatwierdzenia. Kod dostepu: " + car.getCustomer().getAccessCode();
            //smsService.sendSMS(customerNumber,message);

            return diagnosisMapper.mapToNewDiagnosisDto(diagnosis);

        }else
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Diagnosis add error");
    }

    @Override
    public List<DiagnosisWithEmployee> getAllDiagnosis() {
        return diagnosisRepository.findAll()
                .stream()
                .map(diagnosisMapper::mapToDiagnosisWithEmployee)
                .toList();
    }

    @Override
    public DiagnosisDto getDiagnosisById(Long diagnosisId) {
        Diagnosis diagnosis = diagnosisRepository.findById(diagnosisId)
                .orElseThrow(()->new ResourceNotFoundException("diagnosis","id",diagnosisId));
        return diagnosisMapper.mapToDiagnosisDto(diagnosis);
    }

    @Override
    public UpdatedDiagnosisDto updateDiagnosis(UpdatedDiagnosisDto updatedDiagnosisDto, Long diagnosisId) {
        Diagnosis diagnosis = diagnosisRepository.findById(diagnosisId)
                .orElseThrow(() -> new ResourceNotFoundException("diagnosis", "id", diagnosisId));

        if (checkIfStringIsNumber(updatedDiagnosisDto.getEstimatedCost())) {
            if (updatedDiagnosisDto.getDescription() == null || updatedDiagnosisDto.getDescription().isEmpty()) {
                throw new ValidationException("Description");
            }

            Diagnosis updatedDiagnosis = diagnosisMapper.mapToDiagnosis(updatedDiagnosisDto);

            Instant date = Instant.now();
            updatedDiagnosis.setDiagnosisDate(date);
            updatedDiagnosis.setId(diagnosisId);
            updatedDiagnosis.setService(diagnosis.getService());
            updatedDiagnosis.setCar(diagnosis.getCar());
            updatedDiagnosis.setEmployee(diagnosis.getEmployee());

            updatedDiagnosis = diagnosisRepository.save(updatedDiagnosis);
            return diagnosisMapper.mapToUpdatedDiagnosisDto(updatedDiagnosis);
        }else{
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Diagnosis add error");
        }


    }

    @Override
    public UpdatedDiagnosisDto updateDiagnosisStatus(Long diagnosisId, ClientApproval clientApproval) {
        Diagnosis diagnosis = diagnosisRepository.findById(diagnosisId)
                .orElseThrow(() -> new ResourceNotFoundException("diagnosis", "id", diagnosisId));

        diagnosis.setClientApproval(clientApproval);
        diagnosis = diagnosisRepository.save(diagnosis);
        return diagnosisMapper.mapToUpdatedDiagnosisDto(diagnosis);
    }

    @Override
    public List<ShortDiagnosisDto> getCustomerDiagnosesWithWaitingStatus(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer","id",customerId));

        return customer.getCars()
                .stream()
                .flatMap(car -> car.getDiagnoses().stream())
                .filter(diagnosis -> diagnosis.getClientApproval() == ClientApproval.OCZEKUJE)
                .map(diagnosisMapper::mapToShortDiagnosisDto)
                .toList();
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


