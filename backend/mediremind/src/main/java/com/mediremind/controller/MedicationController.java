package com.mediremind.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mediremind.DTO.MedicationDTO;
import com.mediremind.model.Medication;
import com.mediremind.service.MedicationService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/medications")
public class MedicationController {
    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping
    @Operation(summary = "Search for all registered medications")
    public Page<MedicationDTO> getMedications(@RequestParam(defaultValue = "0") int page, 
            							      @RequestParam(defaultValue = "10") int size) {
    	return medicationService.getAllMedications(page, size);
	}

    @GetMapping("/{id}")
    @Operation(summary = "Search registered medications by Id")
    public ResponseEntity<MedicationDTO> getMedicationById(@PathVariable String id) {
        return medicationService.getMedicationById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Register a new medication")
    public ResponseEntity<MedicationDTO> createMedication(@RequestBody Medication medication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medicationService.createMedication(medication));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a medication by Id")
    public ResponseEntity<MedicationDTO> updateMedication(@PathVariable String id, @RequestBody Medication medicationDetails) {
        return medicationService.updateMedication(id, medicationDetails)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a medication by Id")
    public ResponseEntity<Void> deleteMedication(@PathVariable String id) {
        return medicationService.deleteMedication(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
