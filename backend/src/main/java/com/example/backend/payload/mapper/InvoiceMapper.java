package com.example.backend.payload.mapper;

import com.example.backend.model.Invoice;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import com.example.backend.payload.Invoice.InvoiceDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);

    InvoiceDto mapToShortInvoiceDto(Invoice invoice);
    ShortInvoiceDto mapToInvoiceDto(Invoice invoice);
    Invoice mapToInvoice(InvoiceDto invoiceDto);
    Invoice mapToInvoice(ShortInvoiceDto shortInvoiceDto);
}
