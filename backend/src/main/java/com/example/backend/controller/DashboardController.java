package com.example.backend.controller;

import com.example.backend.payload.Dashboard.DashboardDto;
import com.example.backend.payload.Dashboard.ReceptionistDashboardDto;
import com.example.backend.service.DashboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DashboardController {
    private final DashboardService dashboardService;


    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard/{employeeId}")
    ResponseEntity<DashboardDto> getAdminOrMechanicDashboardData(@PathVariable Long employeeId){
        return new ResponseEntity<>(dashboardService.getAdminOrMechanicDashboardData(employeeId), HttpStatus.OK);
    }
    @GetMapping("/dashboard/recept/{employeeId}")
    ResponseEntity<ReceptionistDashboardDto> getReceptionistDashboardData(@PathVariable long employeeId){
        return new ResponseEntity<>(dashboardService.getReceptionistDashboardData(employeeId),HttpStatus.OK);
    }
}
