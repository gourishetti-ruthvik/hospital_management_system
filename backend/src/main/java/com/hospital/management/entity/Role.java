package com.hospital.management.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true, length = 20)
    private RoleName name;
    
    public enum RoleName {
        ROLE_ADMIN,
        ROLE_DOCTOR,
        ROLE_PATIENT
    }
}
