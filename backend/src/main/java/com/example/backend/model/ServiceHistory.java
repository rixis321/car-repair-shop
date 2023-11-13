package com.example.backend.model;

import com.example.backend.model.constants.ServiceStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "service_history")
public class ServiceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private Instant date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id",nullable = false)
    private Service service;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id",nullable = false)
    private Employee employee;
}
