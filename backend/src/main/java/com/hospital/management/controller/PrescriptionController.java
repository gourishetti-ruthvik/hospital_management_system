package com.hospital.management.controller;

import com.hospital.management.entity.Prescription;
import com.hospital.management.security.UserDetailsImpl;
import com.hospital.management.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PrescriptionController {
    
    private final PrescriptionService prescriptionService;
    
    @GetMapping("/patient")
    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(prescriptionService.getPatientPrescriptions(userDetails.getId()));
    }
    
    @GetMapping("/patient/active")
    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    public ResponseEntity<List<Prescription>> getActivePrescriptions(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(prescriptionService.getActivePrescriptions(userDetails.getId()));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionById(id));
    }
    
    @GetMapping("/doctor")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<List<Prescription>> getDoctorPrescriptions(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(prescriptionService.getDoctorPrescriptions(userDetails.getId()));
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<Prescription> createPrescription(
            @RequestBody Prescription prescription,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(prescriptionService.createPrescription(prescription, userDetails.getId()));
    }
}
