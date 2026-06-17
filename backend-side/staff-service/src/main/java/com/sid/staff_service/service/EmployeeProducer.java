package com.sid.staff_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishEmployeeCreated(EmployeeCreatedEvent event) {
        kafkaTemplate.send("employee-created", event);
        System.out.println("✔ Employee event sent: " + event);
    }
}
