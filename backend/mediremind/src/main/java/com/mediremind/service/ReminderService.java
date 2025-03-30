package com.mediremind.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mediremind.DTO.ReminderDTO;
import com.mediremind.model.Reminder;
import com.mediremind.repository.ReminderRepository;

@Service
public class ReminderService {
    private final ReminderRepository reminderRepository;

    public ReminderService(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    public Page<ReminderDTO> getAllReminders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Reminder> reminderPage = reminderRepository.findAll(pageable);

        List<ReminderDTO> ReminderDTOs = reminderPage.getContent().stream()
            .map(reminder -> new ReminderDTO(reminder.getId(), reminder.getReminderTime(), reminder.isSent()))
            .collect(Collectors.toList());

        return new PageImpl<>(ReminderDTOs, pageable, reminderPage.getTotalElements());
    }

    public Optional<ReminderDTO> getReminderById(String id) {
        return reminderRepository.findById(id)
            .map(reminder -> new ReminderDTO(reminder.getId(), reminder.getReminderTime(), reminder.isSent()));
    }

    public ReminderDTO createReminder(Reminder reminder) {
        Reminder savedReminder = reminderRepository.save(reminder);
        return new ReminderDTO(savedReminder.getId(), savedReminder.getReminderTime(), savedReminder.isSent());
    }

    public Optional<ReminderDTO> updateReminder(String id, Reminder reminderDetails) {
        return reminderRepository.findById(id)
            .map(reminder -> {
                reminder.setReminderTime(reminderDetails.getReminderTime());
                reminder.setSent(reminderDetails.isSent());
                reminderRepository.save(reminder);
                return new ReminderDTO(reminder.getId(), reminder.getReminderTime(), reminder.isSent());
            });
    }

    public boolean deleteReminder(String id) {
        return reminderRepository.findById(id)
            .map(reminder -> {
                reminderRepository.delete(reminder);
                return true;
            }).orElse(false);
    }
}
