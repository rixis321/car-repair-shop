package com.example.backend.service;

import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.History.ServiceHistoryDto;

import java.util.List;

public interface RepairHistoryService {

    NewServiceHistoryDto addRepairStage(NewServiceHistoryDto newServiceHistoryDto,Long serviceId,Long employeeId);
    List<ServiceHistoryDto> getServiceRepairHistory(Long serviceId);
    List<ServiceHistoryDto> getLastServiceRepairHistoryByEmployeeId(Long employeeId);

    String deleteServiceHistoryElementById(Long serviceId,Long serviceHistoryElementId);
}
