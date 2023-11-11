package com.example.backend.repository;

import com.example.backend.model.Service;
import com.example.backend.model.constants.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service,Long> {
    Optional<Service> findByServiceStatus(ServiceStatus serviceStatus);
}
