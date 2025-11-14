package com.hospital.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "prescriptions")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "medication_name", nullable = false)
    private String medicationName;
    
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String dosage;
    
    @Size(max = 50)
    private String frequency;
    
    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Size(max = 500)
    private String instructions;
    
    @Size(max = 200)
    private String precautions;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @Size(max = 500)
    private String notes;
    
    @Column(nullable = false)
    private Integer refills = 0;
}
