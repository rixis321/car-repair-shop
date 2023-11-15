package com.example.backend.payload.mapper;

import com.example.backend.model.Invoice;
import com.example.backend.payload.Invoice.InvoiceDto;
import com.example.backend.payload.Invoice.ShortInvoiceDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);

    ShortInvoiceDto mapToShortInvoiceDto(Invoice invoice);
    InvoiceDto mapToInvoiceDto(Invoice invoice);
    Invoice mapToInvoice(ShortInvoiceDto shortInvoiceDto);
    Invoice mapToInvoice(InvoiceDto invoiceDto);
}
