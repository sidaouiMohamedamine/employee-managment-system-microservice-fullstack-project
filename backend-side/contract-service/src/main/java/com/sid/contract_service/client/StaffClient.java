package com.sid.contract_service.client;


import com.sid.contract_service.dto.EmployeeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "staff-service", url = "${staff.service.url}")
public interface StaffClient {
    @GetMapping("/api/staff/employees/{id}")
    EmployeeDTO getEmployeeById(@PathVariable("id") Long id);

}
