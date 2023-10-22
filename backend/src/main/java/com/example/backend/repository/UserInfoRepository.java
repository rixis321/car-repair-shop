package com.example.backend.repository;

import com.example.backend.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserAddress,Long> {
}
