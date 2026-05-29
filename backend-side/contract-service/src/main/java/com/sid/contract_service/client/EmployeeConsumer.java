package com.sid.contract_service.client;

import com.sid.contract_service.dto.EmployeeCreatedEvent;
import com.sid.contract_service.entity.Contract;
import com.sid.contract_service.entity.Type;
import com.sid.contract_service.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class EmployeeConsumer {

    private final ContractRepository contractRepository;

    @KafkaListener(topics = "employee-created", groupId = "contract-group")
    public void consumeEmployeeCreated(EmployeeCreatedEvent event) {

        System.out.println("📥 Receiving employee event: " + event);

        Contract c = new Contract();
        c.setEmployeeId(event.getId());
        c.setStartdate(new Date());
        c.setContractAmount(1300.0);
        c.setType(Type.valueOf("CDI"));

        contractRepository.save(c);

        System.out.println("✔ Contract automatically created for employee id " + event.getId());
    }
}
