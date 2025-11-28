package com.hospital.management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String specialization;
    private Integer experience;
    private String qualification;
    private Double consultationFee;
    private Boolean available;
}
