package com.hospital.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor extends BaseEntity {
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String specialization;
    
    @NotBlank
    @Size(max = 50)
    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;
    
    @Min(0)
    @Max(50)
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;
    
    @Size(max = 100)
    private String qualification;
    
    @Size(max = 500)
    private String bio;
    
    @Column(name = "consultation_fee")
    private Double consultationFee;
    
    @Column(nullable = false)
    private Boolean available = true;
    
    @Size(max = 50)
    private String department;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Prescription> prescriptions = new ArrayList<>();
}
