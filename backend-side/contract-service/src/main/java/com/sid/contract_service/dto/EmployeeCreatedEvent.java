package com.sid.contract_service.dto;

import lombok.Data;

@Data
public class EmployeeCreatedEvent {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
}
