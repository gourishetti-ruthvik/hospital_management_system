package com.hospital.management.controller;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.security.UserDetailsImpl;
import com.hospital.management.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class MedicalRecordController {
    
    private final MedicalRecordService medicalRecordService;
    
    @GetMapping("/patient")
    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    public ResponseEntity<List<MedicalRecord>> getPatientMedicalRecords(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(medicalRecordService.getPatientMedicalRecords(userDetails.getId()));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<MedicalRecord> getMedicalRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecordById(id));
    }
    
    @GetMapping("/patient/type/{recordType}")
    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    public ResponseEntity<List<MedicalRecord>> getRecordsByType(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String recordType) {
        return ResponseEntity.ok(medicalRecordService.getRecordsByType(userDetails.getId(), recordType));
    }
}
