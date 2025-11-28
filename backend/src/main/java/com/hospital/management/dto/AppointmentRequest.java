package com.hospital.management.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
    
    @NotNull
    private Long doctorId;
    
    @NotNull
    private LocalDateTime appointmentDate;
    
    @NotBlank
    @Size(max = 500)
    private String reasonForVisit;
    
    @Size(max = 500)
    private String symptoms;
    
    private Integer durationMinutes = 30;
}
