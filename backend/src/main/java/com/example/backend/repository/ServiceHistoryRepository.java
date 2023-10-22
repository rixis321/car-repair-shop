package com.example.backend.repository;

import com.example.backend.model.ServiceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceHistoryRepository extends JpaRepository<ServiceHistory,Long> {
}
