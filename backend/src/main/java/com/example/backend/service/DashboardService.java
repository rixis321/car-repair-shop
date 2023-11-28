package com.example.backend.service;

import com.example.backend.payload.Dashboard.DashboardDto;
import com.example.backend.payload.Dashboard.ReceptionistDashboardDto;

public interface DashboardService {

    DashboardDto getAdminOrMechanicDashboardData(long employeeId);
    ReceptionistDashboardDto getReceptionistDashboardData(long employeeId);
}
