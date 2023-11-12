package com.example.backend.service;

import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.History.ServiceHistoryDto;

import java.util.List;

public interface RepairHistoryService {

    NewServiceHistoryDto addRepairStage(NewServiceHistoryDto newServiceHistoryDto);

    // historia serwisu todo
    List<ServiceHistoryDto> getServiceRepairHistory(Long serviceId);
}
