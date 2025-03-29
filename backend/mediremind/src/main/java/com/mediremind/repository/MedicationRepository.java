package com.mediremind.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediremind.model.Medication;

public interface MedicationRepository extends MongoRepository<Medication, String> {
    List<Medication> findByUserId(String userId);
}
