package com.sid.staff_service.controller;


import com.sid.staff_service.entity.Departement;
import com.sid.staff_service.service.IDepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/staff/departements")

public class DepartementRestController {

    @Autowired
    private  IDepartementService departementService;

    @PostMapping
    public Departement createDepartement(@RequestBody Departement departement) {
        return departementService.createDepartement(departement);
    }

    @GetMapping
    public List<Departement> getAllDepartements() {
        return departementService.getAllDepartement();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departement> getDepartementById(@PathVariable Long id) {
        Departement departement = departementService.getDepartmentById(id);
        return ResponseEntity.ok(departement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Departement> updateDepartement(@RequestBody Departement departement, @PathVariable Long id) {
        Departement updatedDepartement = departementService.updateDepartement(departement, id);
        return ResponseEntity.ok(updatedDepartement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
        departementService.deleteDepartement(id);
        return ResponseEntity.noContent().build();
    }

}
