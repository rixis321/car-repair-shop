package com.example.backend.payload.mapper;

import com.example.backend.model.Diagnosis;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DiagnosisMapper {
    DiagnosisMapper INSTANCE = Mappers.getMapper(DiagnosisMapper.class);

    @Mapping(target = "car", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "service", ignore = true)
    Diagnosis mapToDiagnosis(NewDiagnosisDto newDiagnosisDto);

    @Mapping(target = "carId",source = "car.id")
    @Mapping(target = "employeeId",source = "employee.id")
    NewDiagnosisDto mapToNewDiagnosisDto(Diagnosis diagnosis);
    default String mapClientApproval(ClientApproval clientApproval) {
        return clientApproval.toString();
    }

    default ClientApproval mapStringToClientApproval(String clientApproval) {
        return ClientApproval.valueOf(clientApproval);
    }
}
