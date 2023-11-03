package com.example.backend.payload.mapper;

import com.example.backend.model.Customer;
import com.example.backend.model.UserAddress;
import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.UserAddressDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    @Mapping(target = "userAddress", source = "userAddressDto")
    @Mapping(target = "cars", ignore = true)
    @Mapping(target = "accessCode", ignore = true)
    Customer mapToCustomer(NewCustomerDto newCustomerDto);

    @Mapping(target = "userAddressDto", source = "userAddress")
    CustomerDto mapToCustomerDto(Customer customer);
    @Mapping(target = "userAddressDto", source = "userAddress")
    NewCustomerDto mapToNewCustomerDto(Customer customer);


    UserAddressDto toUserAddressDto(UserAddress userAddress);


    UserAddress toUserAddress(UserAddressDto userAddressDto);

    ShortCustomerDto mapToShortCustomerDto(Customer customer);
}
