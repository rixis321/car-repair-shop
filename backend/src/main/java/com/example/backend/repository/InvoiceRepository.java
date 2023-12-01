package com.example.backend.repository;

import com.example.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

    List<Invoice> findByServiceId(Long serviceId);
}
