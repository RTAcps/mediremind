package com.mediremind.DTO;

import java.time.LocalDateTime;

public class MedicationDTO {
    private String id;
    private String userId;
    private String name;
    private String dosage;
    private LocalDateTime timer;
    private int frequency;

    public MedicationDTO() {}

    public MedicationDTO(String id, String userId, String name, String dosage, LocalDateTime timer, int frequency) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.dosage = dosage;
        this.timer = timer;
        this.frequency = frequency;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDosage() {
		return dosage;
	}

	public void setDosage(String dosage) {
		this.dosage = dosage;
	}
	
	public LocalDateTime getTimer() {
		return timer;
	}

	public void setTimer(LocalDateTime timer) {
		this.timer = timer;
	}

	public int getFrequency() {
		return frequency;
	}

	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}    
}
