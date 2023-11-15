package com.example.backend.payload.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortInvoiceDto {
    private long id;

    private Instant issueDate;

    private String invoiceNumber;

    private String fullOwnerName;

}
