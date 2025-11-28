package com.hospital.management.repository;

import com.hospital.management.entity.Role;
import com.hospital.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByUsername(String username);
    
    Boolean existsByEmail(String email);
    
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r = :role")
    long countByRoles(@Param("role") Role role);
    
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r = :role")
    List<User> findByRoles(@Param("role") Role role);
}
