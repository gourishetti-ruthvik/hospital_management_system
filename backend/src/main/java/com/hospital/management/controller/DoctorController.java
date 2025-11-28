package com.hospital.management.controller;

import com.hospital.management.dto.DoctorDTO;
import com.hospital.management.entity.Doctor;
import com.hospital.management.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class DoctorController {
    
    private final DoctorService doctorService;
    
    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        List<DoctorDTO> doctors = doctorService.getAllDoctors().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(doctors);
    }
    
    private DoctorDTO convertToDTO(Doctor doctor) {
        return DoctorDTO.builder()
            .id(doctor.getId())
            .fullName(doctor.getUser().getFullName())
            .email(doctor.getUser().getEmail())
            .phoneNumber(doctor.getUser().getPhoneNumber())
            .specialization(doctor.getSpecialization())
            .experience(doctor.getYearsOfExperience())
            .qualification(doctor.getQualification())
            .consultationFee(doctor.getConsultationFee())
            .available(doctor.getAvailable())
            .build();
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Doctor>> getAvailableDoctors() {
        return ResponseEntity.ok(doctorService.getAvailableDoctors());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }
    
    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String specialization) {
        return ResponseEntity.ok(doctorService.getDoctorsBySpecialization(specialization));
    }
    
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(doctorService.getDoctorsByDepartment(department));
    }
    
    @GetMapping("/specializations")
    public ResponseEntity<List<String>> getAllSpecializations() {
        return ResponseEntity.ok(doctorService.getAllSpecializations());
    }
}
