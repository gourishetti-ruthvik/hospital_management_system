package com.hospital.management.service;

import com.hospital.management.entity.Role;
import com.hospital.management.entity.User;
import com.hospital.management.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        Role doctorRole = roleRepository.findByName(Role.RoleName.ROLE_DOCTOR)
                .orElseThrow(() -> new RuntimeException("Doctor role not found"));
        Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT)
                .orElseThrow(() -> new RuntimeException("Patient role not found"));
        
        stats.put("totalDoctors", userRepository.countByRoles(doctorRole));
        stats.put("totalPatients", userRepository.countByRoles(patientRole));
        stats.put("totalAppointments", appointmentRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("activeDoctors", doctorRepository.countByAvailableTrue());
        stats.put("activePatients", patientRepository.count());
        
        return stats;
    }
    
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public List<User> getAllDoctorUsers() {
        Role doctorRole = roleRepository.findByName(Role.RoleName.ROLE_DOCTOR)
                .orElseThrow(() -> new RuntimeException("Doctor role not found"));
        return userRepository.findByRoles(doctorRole);
    }
    
    @Transactional(readOnly = true)
    public List<User> getAllPatientUsers() {
        Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT)
                .orElseThrow(() -> new RuntimeException("Patient role not found"));
        return userRepository.findByRoles(patientRole);
    }
    
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    @Transactional
    public void activateUser(Long id) {
        User user = getUserById(id);
        
        // Prevent admin from deactivating themselves
        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Admin role not found"));
        
        if (user.getRoles().contains(adminRole)) {
            throw new RuntimeException("Cannot deactivate admin user");
        }
        
        user.setActive(true);
        userRepository.save(user);
    }
    
    @Transactional
    public void deactivateUser(Long id) {
        User user = getUserById(id);
        
        // Prevent admin from deactivating themselves
        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Admin role not found"));
        
        if (user.getRoles().contains(adminRole)) {
            throw new RuntimeException("Cannot deactivate admin user");
        }
        
        user.setActive(false);
        userRepository.save(user);
    }
    
    @Transactional
    public void deleteUser(Long id) {
        User user = getUserById(id);
        
        // Prevent admin from deleting themselves
        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Admin role not found"));
        
        if (user.getRoles().contains(adminRole)) {
            throw new RuntimeException("Cannot delete admin user");
        }
        
        userRepository.delete(user);
    }
    
    @Transactional
    public void resetUserPassword(Long id, String newPassword) {
        User user = getUserById(id);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
