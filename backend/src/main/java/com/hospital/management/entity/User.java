package com.hospital.management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {
    
    @NotBlank
    @Size(min = 3, max = 50)
    @Column(nullable = false, unique = true)
    private String username;
    
    @NotBlank
    @Size(max = 100)
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    
    @NotBlank
    @Size(min = 6, max = 100)
    @Column(nullable = false)
    private String password;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @Size(max = 20)
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Size(max = 200)
    private String address;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Doctor doctor;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Patient patient;
}
