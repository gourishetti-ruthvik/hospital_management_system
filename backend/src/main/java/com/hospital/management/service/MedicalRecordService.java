package com.hospital.management.service;

import com.hospital.management.entity.MedicalRecord;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.MedicalRecordRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {
    
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public List<MedicalRecord> getPatientMedicalRecords(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));
        
        return medicalRecordRepository.findByPatientIdOrderByRecordDateDesc(patient.getId());
    }
    
    @Transactional(readOnly = true)
    public MedicalRecord getMedicalRecordById(Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found"));
    }
    
    @Transactional(readOnly = true)
    public List<MedicalRecord> getRecordsByType(Long userId, String recordType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));
        
        return medicalRecordRepository.findByPatientIdAndRecordType(patient.getId(), recordType);
    }
    
    @Transactional(readOnly = true)
    public List<MedicalRecord> getDoctorMedicalRecords(Long doctorId) {
        return medicalRecordRepository.findByDoctorId(doctorId);
    }
}
