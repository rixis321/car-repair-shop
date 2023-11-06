package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Car;
import com.example.backend.model.Diagnosis;
import com.example.backend.model.Employee;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Diagnosis.DiagnosisDto;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.payload.mapper.DiagnosisMapper;
import com.example.backend.repository.CarRepository;
import com.example.backend.repository.DiagnosisRepository;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.service.DiagnosisService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class DiagnosisServiceImpl implements DiagnosisService {

    private final EmployeeRepository employeeRepository;
    private final CarRepository carRepository;

    private final DiagnosisMapper diagnosisMapper;
    private final DiagnosisRepository diagnosisRepository;
    public DiagnosisServiceImpl(EmployeeRepository employeeRepository, CarRepository carRepository, DiagnosisMapper diagnosisMapper, DiagnosisRepository diagnosisRepository) {
        this.employeeRepository = employeeRepository;
        this.carRepository = carRepository;
        this.diagnosisMapper = diagnosisMapper;
        this.diagnosisRepository = diagnosisRepository;
    }

    @Override
    public NewDiagnosisDto addDiagnosis(NewDiagnosisDto newDiagnosisDto) {

        Employee employee = employeeRepository.findById(newDiagnosisDto.getEmployeeId())
                .orElseThrow(()->new ResourceNotFoundException("Employee","id",newDiagnosisDto.getEmployeeId()));
        Car car = carRepository.findById(newDiagnosisDto.getCarId())
                .orElseThrow(()->new ResourceNotFoundException("Car","id",newDiagnosisDto.getCarId()));

        if(checkIfStringIsNumber(newDiagnosisDto.getEstimatedCost())){

            Diagnosis diagnosis = diagnosisMapper.mapToDiagnosis(newDiagnosisDto);
            if(newDiagnosisDto.getDescription() == null || newDiagnosisDto.getDescription().isEmpty()){
                throw new ValidationException("Description");
            }
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


            //todo
            // wyslanie wiadomosci na nr customera

            return diagnosisMapper.mapToNewDiagnosisDto(diagnosis);

        }else
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Diagnosis add error");
    }

    @Override
    public ShortDiagnosisDto getAllDiagnosis() {
        return null;
    }

    @Override
    public DiagnosisDto getDiagnosisById(Long diagnosisId) {
        return null;
    }

    @Override
    public NewDiagnosisDto updateDiagnosis(NewDiagnosisDto newDiagnosisDto, Long diagnosisId) {
        return null;
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


