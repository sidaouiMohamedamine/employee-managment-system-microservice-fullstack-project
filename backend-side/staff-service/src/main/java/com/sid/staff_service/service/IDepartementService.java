package com.sid.staff_service.service;

import com.sid.staff_service.entity.Departement;

import java.util.List;

public interface IDepartementService {
    public Departement createDepartement(Departement departement);
    public List<Departement> getAllDepartement();

    public Departement getDepartmentById(Long id);

    public Departement updateDepartement(Departement departement,Long id);
    public void deleteDepartement(Long id);
}
