package com.hospital.management.service;

import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.Prescription;
import com.hospital.management.entity.User;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.PrescriptionRepository;
import com.hospital.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {
    
    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public List<Prescription> getPatientPrescriptions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));
        
        return prescriptionRepository.findByPatientId(patient.getId());
    }
    
    @Transactional(readOnly = true)
    public List<Prescription> getActivePrescriptions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));
        
        return prescriptionRepository.findByPatientIdAndActiveTrue(patient.getId());
    }
    
    @Transactional(readOnly = true)
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
    }
    
    @Transactional(readOnly = true)
    public List<Prescription> getDoctorPrescriptions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Doctor doctor = doctorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
        
        return prescriptionRepository.findByDoctorId(doctor.getId());
    }
    
    @Transactional
    public Prescription createPrescription(Prescription prescription, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Doctor doctor = doctorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
        
        prescription.setDoctor(doctor);
        if (prescription.getStartDate() == null) {
            prescription.setStartDate(LocalDate.now());
        }
        
        return prescriptionRepository.save(prescription);
    }
}
