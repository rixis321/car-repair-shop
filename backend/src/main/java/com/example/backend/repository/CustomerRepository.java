package com.example.backend.repository;

import com.example.backend.model.Customer;
import com.example.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {

     boolean existsByPhone(String phone);
    // Optional<Employee> findByPhone(String phone);
     //Optional<Employee> findByAccessCode(String accessCode);
}
