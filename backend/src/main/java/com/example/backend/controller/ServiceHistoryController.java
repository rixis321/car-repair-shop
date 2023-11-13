package com.example.backend.controller;

import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.service.RepairHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceHistoryController {
    private final RepairHistoryService repairHistoryService;

    public ServiceHistoryController(RepairHistoryService repairHistoryService) {
        this.repairHistoryService = repairHistoryService;
    }

    @PostMapping("/employees/{employeeId}/services/{serviceId}/history")
    public ResponseEntity<NewServiceHistoryDto> addRepairStage(@RequestBody NewServiceHistoryDto newServiceHistoryDto,
                                                           @PathVariable Long employeeId,
                                                           @PathVariable Long serviceId){

        return new ResponseEntity<>(repairHistoryService.addRepairStage(newServiceHistoryDto,serviceId,employeeId), HttpStatus.CREATED);
    }

    @GetMapping("/services/{serviceId}/history")
    public ResponseEntity<List<ServiceHistoryDto>> getServiceRepairHistory(@PathVariable Long serviceId){
        return new ResponseEntity<>(repairHistoryService.getServiceRepairHistory(serviceId), HttpStatus.CREATED);
    }
}
