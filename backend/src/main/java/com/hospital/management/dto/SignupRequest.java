package com.hospital.management.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignupRequest {
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;
    
    @NotBlank
    @Size(max = 100)
    @Email
    private String email;
    
    @Min(1)
    @Max(120)
    private Integer age;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
