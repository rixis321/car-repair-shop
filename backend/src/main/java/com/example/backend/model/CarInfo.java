package com.example.backend.model;

import com.example.backend.model.constants.FuelType;
import com.example.backend.model.constants.GearboxType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cars_info",uniqueConstraints = @UniqueConstraint(columnNames = {"vin_number"}))
public class CarInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "production_year",nullable = false)
    private int productionYear;
    @Enumerated(EnumType.STRING)
    @Column(name = "gearbox_type",nullable = false)
    private GearboxType gearboxType;
    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type",nullable = false)
    private FuelType fuelType;
    @Column(name = "engine",nullable = false)
    private String engine;
    @Column(name = "vin_number",nullable = false)
    private String vinNumber;
    @OneToOne
    @JoinColumn(name = "car_id")
    private Car car;
}
