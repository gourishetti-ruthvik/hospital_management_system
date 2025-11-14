package com.hospital.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String role; // Single role for frontend compatibility
    private Object user; // User object for frontend
    
    public JwtResponse(String token, Long id, String username, String email, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        // Set single role from first role in list, removing ROLE_ prefix for frontend
        if (roles != null && !roles.isEmpty()) {
            String firstRole = roles.get(0);
            this.role = firstRole.startsWith("ROLE_") ? firstRole.substring(5) : firstRole;
        } else {
            this.role = null;
        }
    }
}
