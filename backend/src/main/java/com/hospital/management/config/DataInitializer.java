package com.hospital.management.config;

import com.hospital.management.entity.Role;
import com.hospital.management.repository.RoleRepository;
import com.hospital.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {
    
    @Bean
    public CommandLineRunner initializeData(RoleRepository roleRepository, UserRepository userRepository) {
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
            
            // You can add more initialization logic here
            // For example, creating a default admin user
            
            log.info("Data initialization completed!");
        };
    }
}
