package com.example.backend.service.impl;

import com.example.backend.model.constants.ClientApproval;
import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.Dashboard.DashboardDto;
import com.example.backend.payload.Dashboard.ReceptionistDashboardDto;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.DiagnosisRepository;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.service.DashboardService;
import com.example.backend.service.RepairHistoryService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {
private final RepairHistoryService repairHistoryService;
private final EmployeeRepository employeeRepository;
private final CustomerRepository customerRepository;
private final DiagnosisRepository diagnosisRepository;
private final ServiceRepository serviceRepository;

    public DashboardServiceImpl(RepairHistoryService repairHistoryService, EmployeeRepository employeeRepository, CustomerRepository customerRepository, DiagnosisRepository diagnosisRepository, ServiceRepository serviceRepository) {
        this.repairHistoryService = repairHistoryService;
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
        this.diagnosisRepository = diagnosisRepository;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public DashboardDto getAdminOrMechanicDashboardData(long employeeId) {
        DashboardDto dashboardDto = new DashboardDto();
        dashboardDto.setServiceHistory(repairHistoryService.getLastServiceRepairHistoryByEmployeeId(employeeId));
        dashboardDto.setTotalClients(customerRepository.count());
        dashboardDto.setTotalEmployees(employeeRepository.count());
        dashboardDto.setServicesToAdd(diagnosisRepository.countByServiceIsNull());

        return dashboardDto;
    }

    @Override
    public ReceptionistDashboardDto getReceptionistDashboardData(long employeeId) {
        ReceptionistDashboardDto dashboardDto = new ReceptionistDashboardDto();

        dashboardDto.setTotalClients(customerRepository.count());
        dashboardDto.setTotalEmployees(employeeRepository.count());
        dashboardDto.setTotalCarsToPickUp(diagnosisRepository.countByClientApproval(
                ClientApproval.ODRZUCONO) + serviceRepository.countByServiceStatus(ServiceStatus.OCZEKUJE_NA_KLIENTA));
        return dashboardDto;
    }
}
