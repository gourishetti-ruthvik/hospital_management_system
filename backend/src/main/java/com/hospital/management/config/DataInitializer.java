package com.hospital.management.config;

import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.Role;
import com.hospital.management.entity.User;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.RoleRepository;
import com.hospital.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {
    
    private final PasswordEncoder passwordEncoder;
    
    @Bean
    public CommandLineRunner initializeData(
            RoleRepository roleRepository, 
            UserRepository userRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository) {
        return args -> {
            // Initialize roles if they don't exist
            if (roleRepository.count() == 0) {
                log.info("Initializing roles...");
                
                Role adminRole = new Role();
                adminRole.setName(Role.RoleName.ROLE_ADMIN);
                
                Role doctorRole = new Role();
                doctorRole.setName(Role.RoleName.ROLE_DOCTOR);
                
                Role patientRole = new Role();
                patientRole.setName(Role.RoleName.ROLE_PATIENT);
                
                roleRepository.save(adminRole);
                roleRepository.save(doctorRole);
                roleRepository.save(patientRole);
                
                log.info("Roles initialized successfully!");
            } else {
                log.info("Roles already exist. Skipping initialization.");
            }
            
            // Get roles
            Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));
            Role doctorRole = roleRepository.findByName(Role.RoleName.ROLE_DOCTOR)
                    .orElseThrow(() -> new RuntimeException("Doctor role not found"));
            Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT)
                    .orElseThrow(() -> new RuntimeException("Patient role not found"));
            
            // Create default admin user if no admin exists
            long adminCount = userRepository.countByRoles(adminRole);
            
            if (adminCount == 0) {
                log.info("Creating default admin user...");
                
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin@hospital.com");
                adminUser.setPassword(passwordEncoder.encode("Admin@123"));
                adminUser.setFullName("System Administrator");
                adminUser.setPhoneNumber("+1234567890");
                adminUser.setActive(true);
                
                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);
                adminUser.setRoles(roles);
                
                userRepository.save(adminUser);
                
                log.info("=============================================");
                log.info("DEFAULT ADMIN CREATED!");
                log.info("Username: admin");
                log.info("Password: Admin@123");
                log.info("Email: admin@hospital.com");
                log.info("=============================================");
            } else {
                log.info("Admin user already exists. Skipping creation.");
            }
            
            // Create sample doctors if none exist
            if (doctorRepository.count() == 0) {
                log.info("Creating sample doctors...");
                
                createDoctor(userRepository, doctorRepository, doctorRole,
                        "dr.smith", "Dr. John Smith", "john.smith@hospital.com", "+1234567891",
                        "MBBS, MD Cardiology", "Cardiology", "Cardiology", 10, 500.0);
                
                createDoctor(userRepository, doctorRepository, doctorRole,
                        "dr.johnson", "Dr. Emily Johnson", "emily.johnson@hospital.com", "+1234567892",
                        "MBBS, MS Orthopedics", "Orthopedics", "Orthopedics", 8, 450.0);
                
                createDoctor(userRepository, doctorRepository, doctorRole,
                        "dr.williams", "Dr. Michael Williams", "michael.williams@hospital.com", "+1234567893",
                        "MBBS, MD Pediatrics", "Pediatrics", "Pediatrics", 12, 400.0);
                
                createDoctor(userRepository, doctorRepository, doctorRole,
                        "dr.davis", "Dr. Sarah Davis", "sarah.davis@hospital.com", "+1234567894",
                        "MBBS, MD Dermatology", "Dermatology", "Dermatology", 7, 380.0);
                
                createDoctor(userRepository, doctorRepository, doctorRole,
                        "dr.brown", "Dr. Robert Brown", "robert.brown@hospital.com", "+1234567895",
                        "MBBS, MS Neurology", "Neurology", "Neurology", 15, 600.0);
                
                log.info("Sample doctors created successfully!");
            } else {
                log.info("Doctors already exist. Skipping creation.");
            }
            
            // Create sample patient if none exist
            if (patientRepository.count() == 0) {
                log.info("Creating sample patient...");
                
                User patientUser = new User();
                patientUser.setUsername("patient1");
                patientUser.setEmail("patient1@example.com");
                patientUser.setPassword(passwordEncoder.encode("Patient@123"));
                patientUser.setFullName("John Doe");
                patientUser.setPhoneNumber("+1234567896");
                patientUser.setActive(true);
                
                Set<Role> patientRoles = new HashSet<>();
                patientRoles.add(patientRole);
                patientUser.setRoles(patientRoles);
                
                User savedPatientUser = userRepository.save(patientUser);
                
                Patient patient = new Patient();
                patient.setUser(savedPatientUser);
                patient.setDateOfBirth(LocalDate.of(1990, 1, 15));
                patient.setGender("Male");
                patient.setBloodGroup("O+");
                patient.setEmergencyContactName("Jane Doe");
                patient.setEmergencyContactPhone("+1234567897");
                patient.setMedicalHistory("No significant medical history");
                patient.setAllergies("None");
                
                patientRepository.save(patient);
                
                log.info("=============================================");
                log.info("SAMPLE PATIENT CREATED!");
                log.info("Username: patient1");
                log.info("Password: Patient@123");
                log.info("Email: patient1@example.com");
                log.info("=============================================");
            } else {
                log.info("Patients already exist. Skipping creation.");
            }
            
            log.info("Data initialization completed!");
        };
    }
    
    private void createDoctor(UserRepository userRepository, DoctorRepository doctorRepository,
                              Role doctorRole, String username, String fullName, String email, 
                              String phone, String qualification, String specialization, 
                              String department, int yearsOfExperience, double consultationFee) {
        User doctorUser = new User();
        doctorUser.setUsername(username);
        doctorUser.setEmail(email);
        doctorUser.setPassword(passwordEncoder.encode("Doctor@123"));
        doctorUser.setFullName(fullName);
        doctorUser.setPhoneNumber(phone);
        doctorUser.setActive(true);
        
        Set<Role> roles = new HashSet<>();
        roles.add(doctorRole);
        doctorUser.setRoles(roles);
        
        User savedDoctorUser = userRepository.save(doctorUser);
        
        Doctor doctor = new Doctor();
        doctor.setUser(savedDoctorUser);
        doctor.setQualification(qualification);
        doctor.setSpecialization(specialization);
        doctor.setDepartment(department);
        doctor.setYearsOfExperience(yearsOfExperience);
        doctor.setConsultationFee(consultationFee);
        doctor.setAvailable(true);
        
        doctorRepository.save(doctor);
        
        log.info("Created doctor: {} ({})", fullName, username);
    }
}
