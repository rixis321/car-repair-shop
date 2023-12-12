package com.example.backend.model;

import com.example.backend.model.constants.ClientApproval;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "diagnoses")
public class Diagnosis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @Column(name = "diagnosis_date",nullable = false)
    private Instant diagnosisDate;
    @Column(nullable = false)
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(name = "client_approval",nullable = false)
    private ClientApproval clientApproval;

    @Column(name = "estimated_cost",nullable = false)
    private String estimatedCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="employee_id",nullable = false)
    private Employee employee;

    @OneToOne(mappedBy = "diagnosis",cascade = CascadeType.ALL,orphanRemoval = true)
    private Service service;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Diagnosis diagnosis = (Diagnosis) obj;
        return id == diagnosis.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
