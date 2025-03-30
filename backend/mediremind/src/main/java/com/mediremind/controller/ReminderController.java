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

import com.mediremind.DTO.ReminderDTO;
import com.mediremind.model.Reminder;
import com.mediremind.service.ReminderService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/reminders")
public class ReminderController {
    private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }

    @GetMapping
    @Operation(summary = "Search for all schedule medications reminders")
    public Page<ReminderDTO> getUsers(@RequestParam(defaultValue = "0") int page, 
            					  	  @RequestParam(defaultValue = "10") int size) {
    	return reminderService.getAllReminders(page, size);
	}

    @GetMapping("/{id}")
    @Operation(summary = "Search schedule medication reminder by Id")
    public ResponseEntity<ReminderDTO> getReminderById(@PathVariable String id) {
        return reminderService.getReminderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Register a new schedule medication reminder")
    public ResponseEntity<ReminderDTO> createReminder(@RequestBody Reminder reminder) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reminderService.createReminder(reminder));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a schedule medication reminder by Id")
    public ResponseEntity<ReminderDTO> updateReminder(@PathVariable String id, @RequestBody Reminder reminderDetails) {
        return reminderService.updateReminder(id, reminderDetails)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a schedule medication reminder by Id")
    public ResponseEntity<Void> deleteReminder(@PathVariable String id) {
        return reminderService.deleteReminder(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}