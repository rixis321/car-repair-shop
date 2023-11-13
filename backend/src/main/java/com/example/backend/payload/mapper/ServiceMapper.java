package com.example.backend.payload.mapper;

import com.example.backend.model.Diagnosis;
import com.example.backend.model.Service;
import com.example.backend.model.ServiceHistory;
import com.example.backend.model.constants.CarType;
import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.Diagnosis.DiagnosisWithEmployee;
import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.payload.Service.ShortServiceDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceMapper INSTANCE = Mappers.getMapper(ServiceMapper.class);

    @Mapping(target = "diagnosis",ignore = true)
    @Mapping(target = "employee",ignore = true)
    @Mapping(target = "serviceHistories",ignore = true)
    @Mapping(target = "invoices",ignore = true)
    Service mapToService(ShortServiceDto shortServiceDto);

    ShortServiceDto mapToShortServiceDto(Service service);
    @Mapping(target = "service",ignore = true)
    @Mapping(target = "employee",ignore = true)
    ServiceHistory mapToServiceHistory(NewServiceHistoryDto newServiceHistoryDto);

    NewServiceHistoryDto mapToNewServiceHistoryDto(ServiceHistory serviceHistory);

    @Mapping(target = "fullEmployeeName",source = "employee.name")
    ServiceHistoryDto mapToServiceHistoryDto(ServiceHistory serviceHistory);

    default String mapServiceStatus(ServiceStatus serviceStatus) {
        return serviceStatus.toString();
    }

    default ServiceStatus mapStringToServiceStatus(String serviceStatus) {
        return ServiceStatus.valueOf(serviceStatus);
    }
    @AfterMapping
    default void combineNameAndLastName(ServiceHistory source, @MappingTarget ServiceHistoryDto target) {
        target.setFullEmployeeName(target.getFullEmployeeName() +" "+ source.getEmployee().getLastname());
    }
}
