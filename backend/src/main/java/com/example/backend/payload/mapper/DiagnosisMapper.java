package com.example.backend.payload.mapper;

import com.example.backend.model.Car;
import com.example.backend.model.Diagnosis;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Car.CarWithoutDiag;
import com.example.backend.payload.Diagnosis.*;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
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

    DiagnosisDto mapToDiagnosisDto(Diagnosis diagnosis);

    @Mapping(target = "car", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "service", ignore = true)
    Diagnosis mapToDiagnosis(UpdatedDiagnosisDto updatedDiagnosisDto);

    @Mapping(source = "carWithoutDiag", target = "car")
    DiagnosisDto mapCarWithoutDiagToDto(CarWithoutDiag carWithoutDiag);
    @Mapping(target = "fullNameOfEmployee",source = "employee.name")
    @Mapping(target = "registrationNumber",source = "car.registrationNumber")
    DiagnosisWithEmployee mapToDiagnosisWithEmployee(Diagnosis diagnosis);

    ShortDiagnosisDto mapToShortDiagnosisDto(Diagnosis diagnosis);

    UpdatedDiagnosisDto mapToUpdatedDiagnosisDto(Diagnosis diagnosis);
    default String mapClientApproval(ClientApproval clientApproval) {
        return clientApproval.toString();
    }

    default ClientApproval mapStringToClientApproval(String clientApproval) {
        return ClientApproval.valueOf(clientApproval);
    }
    @AfterMapping
    default void combineNameAndLastName(Diagnosis source, @MappingTarget DiagnosisWithEmployee target) {
        target.setFullNameOfEmployee(target.getFullNameOfEmployee() +" "+ source.getEmployee().getLastname());
    }
    default CarWithoutDiag mapCarToCarWithoutDiag(Car car) {
        CarWithoutDiag carWithoutDiag = new CarWithoutDiag();
        carWithoutDiag.setId(car.getId());
        carWithoutDiag.setBrand(car.getBrand());
        carWithoutDiag.setModel(car.getModel());
        carWithoutDiag.setRegistrationNumber(car.getRegistrationNumber());
        carWithoutDiag.setType(car.getType());
        carWithoutDiag.setCarInfoDto(CarMapper.INSTANCE.toCarInfoDto(car.getCarInfo()));
        return carWithoutDiag;
    }

}
