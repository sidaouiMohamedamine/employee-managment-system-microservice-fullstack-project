package com.sid.contract_service.service;

import com.sid.contract_service.entity.Contract;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IContractService {
    public Contract createContract(Contract contract);
    public List<Contract> getAllContract();
    public Contract getContractById(Long id);
    public Contract updateContract(Long id, Contract contract);
    public ResponseEntity<Void> deleteContract(Long id);
}
