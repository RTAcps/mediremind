package com.mediremind.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediremind.model.Medication;

public interface MedicationRepository extends MongoRepository<Medication, String> {
	Page<Medication> findAll(Pageable pageable);
	List<Medication> findByUserId(String userId);
}
