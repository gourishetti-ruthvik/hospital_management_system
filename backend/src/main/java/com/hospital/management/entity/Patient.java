package com.hospital.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient extends BaseEntity {
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    
    @Size(max = 10)
    private String gender;
    
    @Size(max = 10)
    @Column(name = "blood_group")
    private String bloodGroup;
    
    @Size(max = 500)
    @Column(name = "medical_history")
    private String medicalHistory;
    
    @Size(max = 500)
    private String allergies;
    
    @Size(max = 100)
    @Column(name = "emergency_contact_name")
    private String emergencyContactName;
    
    @Size(max = 20)
    @Column(name = "emergency_contact_phone")
    private String emergencyContactPhone;
    
    @Size(max = 100)
    @Column(name = "insurance_provider")
    private String insuranceProvider;
    
    @Size(max = 50)
    @Column(name = "insurance_number")
    private String insuranceNumber;
    
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();
    
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords = new ArrayList<>();
    
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions = new ArrayList<>();
}
