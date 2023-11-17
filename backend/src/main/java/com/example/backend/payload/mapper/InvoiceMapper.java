package com.example.backend.payload.mapper;

import com.example.backend.model.*;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);

    @Mapping(target = "diagnosis", source = "service.diagnosis")
    @Mapping(target = "fullOwnerName", source = "service.diagnosis.car.customer.")
    @Mapping(target = "fullCarName", source = "service.diagnosis.car")
    InvoiceDto mapToInvoiceDto(Invoice invoice);

    ShortInvoiceDto mapToShortInvoiceDto(Invoice invoice);

    Invoice mapToInvoice(ShortInvoiceDto shortInvoiceDto);

    Invoice mapToInvoice(InvoiceDto invoiceDto);
    default String map(Customer customer) {

        return customer.getName() + " " + customer.getLastname();
    }

    default String map(Car car) {

        return car.getModel() + " " + car.getBrand();
    }
}


