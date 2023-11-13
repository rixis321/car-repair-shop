package com.example.backend.repository;

import com.example.backend.model.ServiceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceHistoryRepository extends JpaRepository<ServiceHistory,Long> {

    List<ServiceHistory> findAllByServiceId(Long serviceId);
}
