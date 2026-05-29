package com.sid.staff_service.service;

import com.sid.staff_service.entity.Employee;
import com.sid.staff_service.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EmployeeServiceImp implements IEmployeeService{
    private final EmployeeRepository employeeRepository;
    private final EmployeeProducer employeeProducer;
    @Override
    public Employee createEmployee(Employee employee) {
        Employee saved = employeeRepository.save(employee);

        // Create event
        EmployeeCreatedEvent event = new EmployeeCreatedEvent();
        event.setId(saved.getId());
        event.setFirstname(saved.getFirstname());
        event.setLastname(saved.getLastname());
        event.setEmail(saved.getEmail());

        // Publish event
        employeeProducer.publishEmployeeCreated(event);

        return saved;    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Employee employee, Long id) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        existingEmployee.setFirstname(employee.getFirstname());
        existingEmployee.setLastname(employee.getLastname());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setBirthDate(employee.getBirthDate());
        existingEmployee.setPhonenumber(employee.getPhonenumber());
        existingEmployee.setAdress(employee.getAdress());
        existingEmployee.setSalary(employee.getSalary());
        existingEmployee.setTeam(employee.getTeam());
        existingEmployee.setDepartement(employee.getDepartement());
        existingEmployee.setLevel(employee.getLevel());

        return employeeRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }}
