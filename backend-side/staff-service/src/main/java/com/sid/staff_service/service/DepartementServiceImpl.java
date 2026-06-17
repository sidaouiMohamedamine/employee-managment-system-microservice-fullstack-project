package com.sid.staff_service.service;


import com.sid.staff_service.entity.Departement;
import com.sid.staff_service.repository.DepartementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartementServiceImpl implements IDepartementService {

    @Autowired
    private  DepartementRepository departementRepository;

    @Override
    public Departement createDepartement(Departement departement) {
        return departementRepository.save(departement);
    }

    @Override
    public List<Departement> getAllDepartement() {
        return departementRepository.findAll();
    }

    @Override
    public Departement getDepartmentById(Long id) {
        return departementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Departement not found with id: " + id));
    }

    @Override
    public Departement updateDepartement(Departement departement, Long id) {
        Departement existingDepartement = departementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Departement not found with id: " + id));

        existingDepartement.setName(departement.getName());
        existingDepartement.setDescription(departement.getDescription());
        existingDepartement.setEmployees(departement.getEmployees());

        return departementRepository.save(existingDepartement);
    }


    @Override
    public void deleteDepartement(Long id) {
        departementRepository.deleteById(id);
    }

}
