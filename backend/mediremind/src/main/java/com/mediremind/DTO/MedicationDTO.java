package com.mediremind.DTO;

public class MedicationDTO {
    private String id;
    private String name;
    private String dosage;
    private int frequency;

    public MedicationDTO() {}

    public MedicationDTO(String id, String name, String dosage, int frequency) {
        this.id = id;
        this.name = name;
        this.dosage = dosage;
        this.frequency = frequency;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public int getFrequency() {
		return frequency;
	}

	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}    
}
