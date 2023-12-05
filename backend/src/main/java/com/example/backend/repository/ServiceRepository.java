package com.example.backend.repository;

import com.example.backend.model.Service;
import com.example.backend.model.ServiceHistory;
import com.example.backend.model.constants.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service,Long> {
    Optional<Service> findByServiceStatus(ServiceStatus serviceStatus);
    long countByServiceStatus(ServiceStatus serviceStatus);

    @Query("SELECT sh.service.id FROM ServiceHistory sh WHERE sh.id = :serviceHistoryId")
    Optional<Long> findServiceIdByServiceHistoryId(@Param("serviceHistoryId") long serviceHistoryId);
}
