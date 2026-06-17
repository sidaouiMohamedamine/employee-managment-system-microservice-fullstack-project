package com.sid.staff_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Date birthDate;
    private String phonenumber;
    private String adress;
    private Double salary;

    @ManyToOne
    private Team team;
    @ManyToOne

    private Departement departement;

    @Enumerated(EnumType.STRING)
    private Level level;
}
