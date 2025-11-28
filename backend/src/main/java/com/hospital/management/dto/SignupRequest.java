package com.hospital.management.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class SignupRequest {
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;
    
    @NotBlank
    @Size(max = 100)
    @Email
    private String email;
    
    @Min(1)
    @Max(120)
    private Integer age;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    // Role selection (PATIENT, DOCTOR, ADMIN)
    @NotBlank
    private String role;
    
    // Common fields
    private String phoneNumber;
    private String address;
    
    // Doctor-specific fields
    private String specialization;
    private String licenseNumber;
    private Integer yearsOfExperience;
    private String qualification;
    private String bio;
    private Double consultationFee;
    private String department;
    
    // Patient-specific fields
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String medicalHistory;
    private String allergies;
    private String emergencyContactName;
    private String emergencyContactPhone;
}
