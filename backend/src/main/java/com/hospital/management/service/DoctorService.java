package com.hospital.management.service;

import com.hospital.management.entity.Doctor;
import com.hospital.management.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    
    public List<Doctor> getAvailableDoctors() {
        return doctorRepository.findByAvailableTrue();
    }
    
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }
    
    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationAndAvailableTrue(specialization);
    }
    
    public List<Doctor> getDoctorsByDepartment(String department) {
        return doctorRepository.findByDepartment(department);
    }
    
    public List<String> getAllSpecializations() {
        return doctorRepository.findAll().stream()
            .map(Doctor::getSpecialization)
            .distinct()
            .collect(Collectors.toList());
    }
}
