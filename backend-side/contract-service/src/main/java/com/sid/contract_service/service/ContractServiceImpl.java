package com.sid.contract_service.service;

import com.sid.contract_service.client.StaffClient;
import com.sid.contract_service.dto.EmployeeDTO;
import com.sid.contract_service.entity.Contract;
import com.sid.contract_service.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements IContractService {

    private final ContractRepository contractRepository;
    private final StaffClient staffClient;


    @Override
    public Contract createContract(Contract contract) {
        EmployeeDTO employee;
        try {
            employee = staffClient.getEmployeeById(contract.getEmployeeId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not found");
        }



        return contractRepository.save(contract);
    }
    @Override
    public List<Contract> getAllContract() {
        return contractRepository.findAll();
    }

    @Override
    public Contract getContractById(Long id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contract not found with id: " + id));
    }

    @Override
    public Contract updateContract(Long id, Contract contract) {
        Contract existing = getContractById(id);

        existing.setStartdate(contract.getStartdate());
        existing.setEnddate(contract.getEnddate());
        existing.setContractAmount(contract.getContractAmount());
        existing.setType(contract.getType());

        return contractRepository.save(existing);
    }

    @Override
    public ResponseEntity<Void> deleteContract(Long id) {
        Contract existing = getContractById(id);
        contractRepository.delete(existing);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
