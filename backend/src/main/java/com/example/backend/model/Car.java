package com.example.backend.model;

import com.example.backend.model.constants.CarType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "cars",uniqueConstraints = @UniqueConstraint(columnNames = {"registration_number"}))
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(name = "registration_number",nullable = false)
    private String registrationNumber;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CarType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id",nullable = false)
    private Customer customer;
    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL)
    private CarInfo carInfo;

    @OneToMany(mappedBy = "car",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Diagnosis> diagnoses;
}
