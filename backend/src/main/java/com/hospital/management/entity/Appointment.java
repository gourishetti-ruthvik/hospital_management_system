package com.hospital.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    
    @NotNull
    @Column(name = "appointment_date", nullable = false)
    private LocalDateTime appointmentDate;
    
    @NotBlank
    @Size(max = 20)
    @Column(nullable = false)
    private String status; // SCHEDULED, CONFIRMED, COMPLETED, CANCELLED
    
    @Size(max = 500)
    @Column(name = "reason_for_visit")
    private String reasonForVisit;
    
    @Size(max = 1000)
    private String notes;
    
    @Size(max = 500)
    private String symptoms;
    
    @Size(max = 1000)
    private String diagnosis;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "follow_up_required")
    private Boolean followUpRequired = false;
    
    @Column(name = "follow_up_date")
    private LocalDateTime followUpDate;
}
