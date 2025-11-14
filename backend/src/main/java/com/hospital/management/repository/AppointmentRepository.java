package com.hospital.management.repository;

import com.hospital.management.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByPatientId(Long patientId);
    
    List<Appointment> findByDoctorId(Long doctorId);
    
    List<Appointment> findByStatus(String status);
    
    List<Appointment> findByPatientIdAndStatus(Long patientId, String status);
    
    List<Appointment> findByDoctorIdAndStatus(Long doctorId, String status);
    
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointmentDate BETWEEN :startDate AND :endDate")
    List<Appointment> findDoctorAppointmentsInDateRange(
        @Param("doctorId") Long doctorId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
    
    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId ORDER BY a.appointmentDate DESC")
    List<Appointment> findPatientAppointmentsOrderedByDate(@Param("patientId") Long patientId);
}
