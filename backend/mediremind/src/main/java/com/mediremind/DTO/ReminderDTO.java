package com.mediremind.DTO;

import java.time.LocalDateTime;

public class ReminderDTO {
    private String id;
    private LocalDateTime reminderTime;
    private boolean sent;

    public ReminderDTO() {}

    public ReminderDTO(String id, LocalDateTime reminderTime, boolean sent) {
        this.id = id;
        this.reminderTime = reminderTime;
        this.sent = sent;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
