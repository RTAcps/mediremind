package com.mediremind.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

@Document(collection = "reminders")
public class Reminder {
    @Id
    private String id;
    private String userId;
    private String medicationId;
    private LocalDateTime reminderTime;
    private boolean sent; // Status da notificação

    public Reminder() {
    	this.id = NanoIdUtils.randomNanoId();
    }

    public Reminder(String userId, String medicationId, LocalDateTime reminderTime, boolean sent) {
    	this.id = NanoIdUtils.randomNanoId();
        this.userId = userId;
        this.medicationId = medicationId;
        this.reminderTime = reminderTime;
        this.sent = sent;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getMedicationId() {
		return medicationId;
	}

	public void setMedicationId(String medicationId) {
		this.medicationId = medicationId;
	}

	public LocalDateTime getReminderTime() {
		return reminderTime;
	}

	public void setReminderTime(LocalDateTime reminderTime) {
		this.reminderTime = reminderTime;
	}

	public boolean isSent() {
		return sent;
	}

	public void setSent(boolean sent) {
		this.sent = sent;
	}    
}
