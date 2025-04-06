package com.mediremind.DTO;

import java.time.LocalDateTime;

public class ReminderDTO {
    private String id;
    private String userId;
    private String medicationId;
    private LocalDateTime reminderTime;
    private boolean sent;

	public ReminderDTO() {}

    public ReminderDTO(String id, String userId, String medicationId, LocalDateTime reminderTime, boolean sent) {
        this.id = id;
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
