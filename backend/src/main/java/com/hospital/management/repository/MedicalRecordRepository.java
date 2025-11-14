package com.hospital.management.repository;

import com.hospital.management.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    
    List<MedicalRecord> findByPatientId(Long patientId);
    
    List<MedicalRecord> findByDoctorId(Long doctorId);
    
    List<MedicalRecord> findByAppointmentId(Long appointmentId);
    
    List<MedicalRecord> findByPatientIdAndRecordType(Long patientId, String recordType);
    
    List<MedicalRecord> findByPatientIdOrderByRecordDateDesc(Long patientId);
}
