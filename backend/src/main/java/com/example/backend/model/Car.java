package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

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

    @Column(nullable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    @OneToOne(mappedBy = "car", cascade = CascadeType.ALL)
    private CarInfo carInfo;

    @OneToMany(mappedBy = "car",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Diagnosis> diagnoses;
}
