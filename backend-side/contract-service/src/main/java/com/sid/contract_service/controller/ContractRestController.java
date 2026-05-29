package com.sid.contract_service.controller;


import com.sid.contract_service.entity.Contract;
import com.sid.contract_service.service.IContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contract/contracts")
@RequiredArgsConstructor
public class ContractRestController {

    private final IContractService contractService;

    @PostMapping
    public ResponseEntity<Contract> createContract(@RequestBody Contract contract) {
        Contract saved = contractService.createContract(contract);
        return ResponseEntity.ok(saved);
    }
    @GetMapping
    public List<Contract> getAllContracts() {
        return contractService.getAllContract();
    }

    @GetMapping("/{id}")
    public Contract getContractById(@PathVariable Long id) {
        return contractService.getContractById(id);
    }

    @PutMapping("/{id}")
    public Contract updateContract(@PathVariable Long id, @RequestBody Contract contract) {
        return contractService.updateContract(id, contract);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable Long id) {
        return contractService.deleteContract(id);
    }
}
