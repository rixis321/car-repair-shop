package com.example.backend.repository;

import com.example.backend.model.CarInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarInfoRepository extends JpaRepository<CarInfo,Long> {

    boolean existsByVinNumber(String vinNumber);
}
