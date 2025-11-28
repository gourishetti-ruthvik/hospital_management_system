package com.hospital.management.controller;

import com.hospital.management.dto.MessageResponse;
import com.hospital.management.entity.User;
import com.hospital.management.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    private final AdminService adminService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }
    
    // User Management
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
    
    @GetMapping("/users/doctors")
    public ResponseEntity<List<User>> getAllDoctors() {
        return ResponseEntity.ok(adminService.getAllDoctorUsers());
    }
    
    @GetMapping("/users/patients")
    public ResponseEntity<List<User>> getAllPatients() {
        return ResponseEntity.ok(adminService.getAllPatientUsers());
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }
    
    @PutMapping("/users/{id}/activate")
    public ResponseEntity<MessageResponse> activateUser(@PathVariable Long id) {
        adminService.activateUser(id);
        return ResponseEntity.ok(new MessageResponse("User activated successfully"));
    }
    
    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<MessageResponse> deactivateUser(@PathVariable Long id) {
        adminService.deactivateUser(id);
        return ResponseEntity.ok(new MessageResponse("User deactivated successfully"));
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    }
    
    @PutMapping("/users/{id}/reset-password")
    public ResponseEntity<MessageResponse> resetUserPassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        String newPassword = request.get("newPassword");
        adminService.resetUserPassword(id, newPassword);
        return ResponseEntity.ok(new MessageResponse("Password reset successfully"));
    }
}
