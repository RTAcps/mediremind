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

    public Page<MedicationDTO> getAllMedications(String userId, int page, int size) {
        if (userId != null) {
            List<Medication> usersById = medicationRepository.findByUserId(userId);
            List<MedicationDTO> medicationDTOs = usersById.stream()
                .map(medication -> new MedicationDTO(medication.getId(), medication.getUserId(), medication.getName(), medication.getDosage(), medication.getTimer(), medication.getFrequency()))
                .collect(Collectors.toList());

            return new PageImpl<>(medicationDTOs, PageRequest.of(page, size), medicationDTOs.size());
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Medication> medicationPage = medicationRepository.findAll(pageable);

        List<MedicationDTO> medicationDTOs = medicationPage.getContent().stream()
                .map(medication -> new MedicationDTO(medication.getId(), medication.getUserId(), medication.getName(), medication.getDosage(), medication.getTimer(), medication.getFrequency()))
                .collect(Collectors.toList());

        return new PageImpl<>(medicationDTOs, PageRequest.of(page, size), medicationDTOs.size());
    }

    public Optional<MedicationDTO> getMedicationById(String id) {
        return medicationRepository.findById(id)
            .map(medication -> new MedicationDTO(medication.getId(), medication.getUserId(), medication.getName(), medication.getDosage(), medication.getTimer(), medication.getFrequency()));
    }

    public MedicationDTO createMedication(Medication medication) {
        Medication savedMedication = medicationRepository.save(medication);
        return new MedicationDTO(savedMedication.getId(), savedMedication.getUserId(), savedMedication.getName(), savedMedication.getDosage(), savedMedication.getTimer(), savedMedication.getFrequency());
    }

    public Optional<MedicationDTO> updateMedication(String id, Medication medDetails) {
        return medicationRepository.findById(id)
            .map(medication -> {
            	medication.setName(medDetails.getName());
            	medication.setDosage(medDetails.getDosage());
            	medication.setFrequency(medDetails.getFrequency());
                medicationRepository.save(medication);
                return new MedicationDTO(medication.getId(), medication.getUserId(), medication.getName(), medication.getDosage(), medication.getTimer(), medication.getFrequency());
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
