package com.example.backend.payload.mapper;

import com.example.backend.model.Service;
import com.example.backend.model.constants.CarType;
import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.Service.ShortServiceDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
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

    default String mapServiceStatus(ServiceStatus serviceStatus) {
        return serviceStatus.toString();
    }

    default ServiceStatus mapStringToServiceStatus(String serviceStatus) {
        return ServiceStatus.valueOf(serviceStatus);
    }
}
