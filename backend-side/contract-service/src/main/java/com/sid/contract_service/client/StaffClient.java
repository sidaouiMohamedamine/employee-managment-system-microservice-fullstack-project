package com.sid.contract_service.client;


import com.sid.contract_service.config.FeignAuthConfig;
import com.sid.contract_service.dto.EmployeeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "staff-service",
        url = "${staff.service.url}",
        configuration = FeignAuthConfig.class
)
public interface StaffClient {

    @GetMapping("/api/staff/employees/{id}")
    EmployeeDTO getEmployeeById(@PathVariable Long id);
}