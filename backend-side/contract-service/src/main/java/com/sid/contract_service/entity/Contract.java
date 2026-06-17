package com.sid.contract_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date startdate;
    private Date enddate;
    private Double contractAmount;
    @Enumerated(EnumType.STRING)
    private Type type;
    private Long employeeId;

}
