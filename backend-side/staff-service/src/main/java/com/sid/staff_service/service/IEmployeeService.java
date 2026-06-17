package com.sid.staff_service.service;

import com.sid.staff_service.entity.Employee;

import java.util.List;

public interface IEmployeeService {
    public Employee createEmployee(Employee employee);
    public List<Employee> getAllEmployee();
    public Employee getEmployeeById(Long id);

    public Employee updateEmployee(Employee employee,Long id);
    public void deleteEmployee(Long id);
}
