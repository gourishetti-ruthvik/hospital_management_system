package com.hospital.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "medical_records")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    
    @NotNull
    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "record_type", nullable = false)
    private String recordType; // CHECKUP, LAB_RESULT, RADIOLOGY, SURGERY, etc.
    
    @NotBlank
    @Size(max = 200)
    @Column(nullable = false)
    private String title;
    
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @Size(max = 500)
    private String diagnosis;
    
    @Size(max = 500)
    private String treatment;
    
    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String labResults;
    
    @Size(max = 200)
    @Column(name = "file_path")
    private String filePath;
    
    @Size(max = 500)
    private String notes;
    
    @Column(nullable = false)
    private Boolean confidential = false;
}
