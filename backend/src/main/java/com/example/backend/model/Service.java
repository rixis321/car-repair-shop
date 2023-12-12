package com.example.backend.model;

import com.example.backend.model.constants.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String cost;
    @Enumerated(EnumType.STRING)
    @Column(name = "status",nullable = false)
    private ServiceStatus serviceStatus;

    @OneToOne
    @JoinColumn(name = "diagnosis_id")
    private Diagnosis diagnosis;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id",nullable = false)
    private Employee employee;

    @OneToMany(mappedBy = "service",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ServiceHistory> serviceHistories;

    @OneToMany(mappedBy = "service",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Invoice> invoices;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Service service = (Service) obj;
        return id == service.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
