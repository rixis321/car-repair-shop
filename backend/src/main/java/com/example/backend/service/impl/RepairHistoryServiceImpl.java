package com.example.backend.service.impl;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Employee;
import com.example.backend.model.ServiceHistory;
import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.payload.mapper.ServiceMapper;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.ServiceHistoryRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.service.RepairHistoryService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RepairHistoryServiceImpl implements RepairHistoryService {
    private final ServiceHistoryRepository serviceHistoryRepository;
    private final ServiceRepository serviceRepository;
    private final EmployeeRepository employeeRepository;
    private final ServiceMapper serviceMapper;

    public RepairHistoryServiceImpl(ServiceHistoryRepository serviceHistoryRepository, ServiceRepository serviceRepository, EmployeeRepository employeeRepository, ServiceMapper serviceMapper) {
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceRepository = serviceRepository;
        this.employeeRepository = employeeRepository;
        this.serviceMapper = serviceMapper;
    }


    @Override
    public NewServiceHistoryDto addRepairStage(NewServiceHistoryDto newServiceHistoryDto, Long serviceId, Long employeeId) {

       com.example.backend.model.Service service = serviceRepository
               .findById(serviceId)
               .orElseThrow(()-> new ResourceNotFoundException("Service","id",serviceId));

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));

        ServiceHistory serviceHistory = serviceMapper.mapToServiceHistory(newServiceHistoryDto);
        serviceHistory.setEmployee(employee);
        Instant date = Instant.now();
        serviceHistory.setDate(date);
        serviceHistory.setService(service);

        if(service.getServiceHistories().size() > 1){
            service.setServiceStatus(ServiceStatus.W_TRAKCIE);
            service = serviceRepository.save(service);
        }
        serviceHistory = serviceHistoryRepository.save(serviceHistory);

        return serviceMapper.mapToNewServiceHistoryDto(serviceHistory);
    }

    @Override
    public List<ServiceHistoryDto> getServiceRepairHistory(Long serviceId) {
        com.example.backend.model.Service service = serviceRepository
                .findById(serviceId)
                .orElseThrow(()-> new ResourceNotFoundException("Service","id",serviceId));


        return serviceHistoryRepository.findAllByServiceId(serviceId)
                .stream()
                .map(serviceMapper::mapToServiceHistoryDto)
                .toList();


    }


    @Override
    public List<ServiceHistoryDto> getLastServiceRepairHistoryByEmployeeId(Long employeeId) {
      Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee","id",employeeId));
      if(
              employee.getRoles()
                      .stream()
                      .findFirst()
                      .filter(role -> role.getName().equals("ADMIN"))
                      .isPresent()
      )
        {
          return serviceHistoryRepository.findAll()
                  .stream()
                  .sorted((a,b)-> b.getDate().compareTo(a.getDate()))
                  .limit(10)
                  .map(serviceMapper::mapToServiceHistoryDto)
                  .toList();
        }
      else{
          return employee.getServiceHistories()
                  .stream()
                  .sorted((a,b)-> b.getDate().compareTo(a.getDate()))
                  .limit(10)
                  .map(serviceMapper::mapToServiceHistoryDto)
                  .toList();
      }
    }

    @Override
    public String deleteServiceHistoryElementById(Long serviceId, Long serviceHistoryElementId) {
        com.example.backend.model.Service service = serviceRepository
                .findById(serviceId)
                .orElseThrow(()-> new ResourceNotFoundException("Service","id",serviceId));

        List<ServiceHistory> updatedHistories = service.getServiceHistories().stream()
                .filter(history -> history.getId() != serviceHistoryElementId)
                .toList();

        service.getServiceHistories().clear();
        service.getServiceHistories().addAll(updatedHistories);

        serviceRepository.save(service);

        return "Service history element deleted successfully";
    }
}
