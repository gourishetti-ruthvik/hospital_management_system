package com.hospital.management.service;

import com.hospital.management.dto.LoginRequest;
import com.hospital.management.dto.SignupRequest;
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
            .active(true)
            .build();
        
        // Set default role: PATIENT
        Set<Role> roles = new HashSet<>();
        Role patientRole = roleRepository.findByName(Role.RoleName.ROLE_PATIENT)
            .orElseThrow(() -> new RuntimeException("Error: Role PATIENT is not found."));
        roles.add(patientRole);
        
        user.setRoles(roles);
        return userRepository.save(user);
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
