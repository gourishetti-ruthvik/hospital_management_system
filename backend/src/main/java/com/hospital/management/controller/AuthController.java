package com.hospital.management.controller;

import com.hospital.management.dto.JwtResponse;
import com.hospital.management.dto.LoginRequest;
import com.hospital.management.dto.MessageResponse;
import com.hospital.management.dto.SignupRequest;
import com.hospital.management.entity.User;
import com.hospital.management.security.UserDetailsImpl;
import com.hospital.management.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            String jwt = authService.authenticateUser(loginRequest);
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            
            List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
            
            JwtResponse response = new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
            );
            
            // Create user object for frontend
            java.util.Map<String, Object> user = new java.util.HashMap<>();
            user.put("id", userDetails.getId());
            user.put("username", userDetails.getUsername());
            user.put("email", userDetails.getEmail());
            user.put("fullName", userDetails.getEmail()); // You can add fullName to UserDetailsImpl if needed
            response.setUser(user);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Invalid username or password!"));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            if (authService.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
            }
            
            if (authService.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
            }
            
            User user = authService.registerUser(signupRequest);
            
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/check")
    public ResponseEntity<?> checkAuth() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication != null && authentication.isAuthenticated() 
                && !(authentication.getPrincipal() instanceof String)) {
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                
                List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
                
                return ResponseEntity.ok(new JwtResponse(
                    null, // No need to send token back
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles
                ));
            }
            
            return ResponseEntity.ok(new MessageResponse("Not authenticated"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new MessageResponse("User logged out successfully!"));
    }
}
