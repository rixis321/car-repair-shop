package com.example.backend.payload.mapper;

import com.example.backend.model.Car;
import com.example.backend.model.CarInfo;
import com.example.backend.model.constants.CarType;
import com.example.backend.model.constants.FuelType;
import com.example.backend.payload.Car.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarMapper INSTANCE = Mappers.getMapper(CarMapper.class);

    @Mapping(source = "carInfoDto", target = "carInfo")
    @Mapping(source = "type", target = "type")
    @Mapping(target = "customer",ignore = true)
    @Mapping(target = "diagnoses",ignore = true)
    Car toCar(NewCarDto newCarDto);


    CarDto toCarDto(Car car);

    @Mapping(target = "fullOwnerName", ignore = true)
    ShortCarDto toShortCarDto(Car car);

    @Mapping(source = "carInfo", target = "carInfoDto")
    @Mapping(source = "type", target = "type")
    NewCarDto toNewCarDto(Car car);

    @Mapping(source = "fuelType", target = "fuelType")
    CarInfoDto toCarInfoDto(CarInfo carInfo);


    ShortCarCustomerDto toShortCarCustomerDto(Car car);
    @Mapping(source = "fuelType", target = "fuelType")
    CarInfo toCarInfo(CarInfoDto carInfoDto);

    default String mapCarType(CarType carType) {
        return carType.toString();
    }

    default CarType mapStringToCarType(String carType) {
        return CarType.valueOf(carType);
    }

    default String mapFuelType(FuelType fuelType) {
        return fuelType.toString();
    }

    default FuelType mapStringToFuelType(String fuelType) {
        return FuelType.valueOf(fuelType);
    }
}
