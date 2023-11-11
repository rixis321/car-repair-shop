package com.example.backend.service;

import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.Service.ServiceDto;
import com.example.backend.payload.Service.ShortServiceDto;

import java.util.List;

public interface RepairService {

    ShortServiceDto addService(ShortServiceDto shortServiceDto,Long employeeId, Long diagnosisId);

    List<ShortServiceDto> getAllServices();

    List<ShortServiceDto> getServicesByStatus(ServiceStatus serviceStatus);
    ServiceDto getServiceById(Long serviceId);

    ShortServiceDto updateService(ShortServiceDto shortServiceDto, Long serviceId);
}
