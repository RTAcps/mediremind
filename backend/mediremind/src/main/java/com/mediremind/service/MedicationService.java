package com.mediremind.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mediremind.DTO.MedicationDTO;
import com.mediremind.model.Medication;
import com.mediremind.repository.MedicationRepository;

@Service
public class MedicationService {
    private final MedicationRepository medicationRepository;

    public MedicationService(MedicationRepository medicationRepository) {
        this.medicationRepository = medicationRepository;
    }

    public Page<MedicationDTO> getAllMedications(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Medication> medicationPage = medicationRepository.findAll(pageable);

        List<MedicationDTO> medicationDTOs = medicationPage.getContent().stream()
            .map(medication -> new MedicationDTO(medication.getId(), medication.getName(), medication.getDosage(), medication.getFrequency()))
            .collect(Collectors.toList());

        return new PageImpl<>(medicationDTOs, pageable, medicationPage.getTotalElements());
    }

    public Optional<MedicationDTO> getMedicationById(String id) {
        return medicationRepository.findById(id)
            .map(med -> new MedicationDTO(med.getId(), med.getName(), med.getDosage(), med.getFrequency()));
    }

    public MedicationDTO createMedication(Medication medication) {
        Medication savedMed = medicationRepository.save(medication);
        return new MedicationDTO(savedMed.getId(), savedMed.getName(), savedMed.getDosage(), savedMed.getFrequency());
    }

    public Optional<MedicationDTO> updateMedication(String id, Medication medDetails) {
        return medicationRepository.findById(id)
            .map(med -> {
                med.setName(medDetails.getName());
                med.setDosage(medDetails.getDosage());
                med.setFrequency(medDetails.getFrequency());
                medicationRepository.save(med);
                return new MedicationDTO(med.getId(), med.getName(), med.getDosage(), med.getFrequency());
            });
    }

    public boolean deleteMedication(String id) {
        return medicationRepository.findById(id)
            .map(med -> {
                medicationRepository.delete(med);
                return true;
            }).orElse(false);
    }
}
