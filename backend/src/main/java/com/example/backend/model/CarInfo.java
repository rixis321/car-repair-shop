package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "cars_info",uniqueConstraints = @UniqueConstraint(columnNames = {"vin_number"}))
public class CarInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "production_year",nullable = false)
    private int productionYear;
    @Column(name = "gearbox_type",nullable = false)
    private String gearboxType;
    @Column(name = "fuel_type",nullable = false)
    private String fuelType;

    @Column(name = "vin_number",nullable = false)
    private String vinNumber;

    @OneToOne
    @JoinColumn(name = "car_id")
    private Car car;
}
