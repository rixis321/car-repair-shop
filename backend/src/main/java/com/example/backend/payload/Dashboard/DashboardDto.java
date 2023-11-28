package com.example.backend.payload.Dashboard;

import com.example.backend.payload.History.ServiceHistoryDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDto {
    long totalClients;
    long totalEmployees;
    long servicesToAdd;
    List<ServiceHistoryDto> serviceHistory;

}
