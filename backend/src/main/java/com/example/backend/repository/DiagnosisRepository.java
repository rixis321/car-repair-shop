package com.example.backend.repository;

import com.example.backend.model.Diagnosis;
import com.example.backend.model.constants.ClientApproval;
import com.example.backend.model.constants.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiagnosisRepository extends JpaRepository<Diagnosis,Long> {
    long countByServiceIsNull();
    long countByClientApproval(ClientApproval clientApproval);
}
