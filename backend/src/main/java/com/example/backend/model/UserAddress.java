package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "users_info")
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String zipcode;
    @Column(name = "street_number",nullable = false)
    private String streetNumber;
    @Column(name = "street_name",nullable = false)
    private String streetName;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
