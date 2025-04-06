package com.mediremind.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

@Document(collection = "medications")
public class Medication {
    @Id
    private String id;
    private String userId; 
    private String name;
    private String dosage;
    private LocalDateTime timer; 
    private int frequency; 

    public Medication() {
    	this.id = NanoIdUtils.randomNanoId();
    }

    public Medication(String userId, String name, String dosage, LocalDateTime timer, int frequency) {
    	this.id = NanoIdUtils.randomNanoId();
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
