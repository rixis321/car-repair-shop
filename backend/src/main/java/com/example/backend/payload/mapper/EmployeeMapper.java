package com.example.backend.payload.mapper;

import com.example.backend.model.Employee;
import com.example.backend.model.Role;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.Employee.EmployeeDto;
import com.example.backend.payload.Employee.NewEmployeeDto;
import com.example.backend.payload.Employee.ShortEmployeeDto;
import com.example.backend.payload.UserAddressDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);
    @Mapping(target = "userAddressDto", source = "userAddress")
    @Mapping(target = "diagnoses", ignore = true)
    @Mapping(target = "services", ignore = true)
    EmployeeDto mapToEmployeeDto(Employee employee);

    ShortEmployeeDto mapToShortEmployeeDto(Employee employee);

    UserAddressDto toUserAddressDto(UserAddress userAddress);


    UserAddress toUserAddress(UserAddressDto userAddressDto);

    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "userAddress", source = "userAddressDto")
    Employee mapToEmployee(NewEmployeeDto newEmployeeDto);

    @Mapping(target = "role",source = "roles")
    @Mapping(target = "userAddressDto",source = "userAddress")
    NewEmployeeDto mapToNewEmployeeDto(Employee employee);

    default String mapRolesToString(Set<Role> roles) {
        return roles.stream()
                .map(Role::getName)
                .collect(Collectors.joining(","));
    }
}
