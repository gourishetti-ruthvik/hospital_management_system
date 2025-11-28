package com.hospital.management.service;

import com.hospital.management.dto.LoginRequest;
import com.hospital.management.dto.SignupRequest;
import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.Role;
import com.hospital.management.entity.User;
import com.hospital.management.repository.RoleRepository;
import com.hospital.management.repository.UserRepository;
import com.hospital.management.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    
    public String authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }
    
    @Transactional
    public User registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }
        
        // Create new user
        User user = User.builder()
            .username(signupRequest.getUsername())
            .email(signupRequest.getEmail())
            .password(passwordEncoder.encode(signupRequest.getPassword()))
            .fullName(signupRequest.getName())
            .phoneNumber(signupRequest.getPhoneNumber())
            .address(signupRequest.getAddress())
            .active(true)
            .build();
        
        // Set role based on user selection
        Set<Role> roles = new HashSet<>();
        Role.RoleName roleName;
        
        try {
            roleName = Role.RoleName.valueOf("ROLE_" + signupRequest.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role specified!");
        }
        
        Role userRole = roleRepository.findByName(roleName)
            .orElseThrow(() -> new RuntimeException("Error: Role " + roleName + " is not found."));
        roles.add(userRole);
        
        user.setRoles(roles);
        User savedUser = userRepository.save(user);
        
        // Create role-specific profile
        if (roleName == Role.RoleName.ROLE_DOCTOR) {
            createDoctorProfile(savedUser, signupRequest);
        } else if (roleName == Role.RoleName.ROLE_PATIENT) {
            createPatientProfile(savedUser, signupRequest);
        }
        
        return savedUser;
    }
    
    private void createDoctorProfile(User user, SignupRequest request) {
        Doctor doctor = Doctor.builder()
            .user(user)
            .specialization(request.getSpecialization() != null ? request.getSpecialization() : "General Medicine")
            .licenseNumber(request.getLicenseNumber() != null ? request.getLicenseNumber() : "LIC" + System.currentTimeMillis())
            .yearsOfExperience(request.getYearsOfExperience() != null ? request.getYearsOfExperience() : 0)
            .qualification(request.getQualification())
            .bio(request.getBio())
            .consultationFee(request.getConsultationFee() != null ? request.getConsultationFee() : 500.0)
            .department(request.getDepartment() != null ? request.getDepartment() : "General")
            .available(true)
            .build();
        
        user.setDoctor(doctor);
    }
    
    private void createPatientProfile(User user, SignupRequest request) {
        Patient patient = Patient.builder()
            .user(user)
            .dateOfBirth(request.getDateOfBirth())
            .gender(request.getGender())
            .bloodGroup(request.getBloodGroup())
            .medicalHistory(request.getMedicalHistory())
            .allergies(request.getAllergies())
            .emergencyContactName(request.getEmergencyContactName())
            .emergencyContactPhone(request.getEmergencyContactPhone())
            .build();
        
        user.setPatient(patient);
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
