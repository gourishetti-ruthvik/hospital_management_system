package com.hospital.management.service;

import com.hospital.management.dto.AppointmentRequest;
import com.hospital.management.entity.Appointment;
import com.hospital.management.entity.Doctor;
import com.hospital.management.entity.Patient;
import com.hospital.management.entity.User;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import com.hospital.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public Appointment bookAppointment(AppointmentRequest request, Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Patient patient = user.getPatient();
        if (patient == null) {
            throw new RuntimeException("User is not registered as a patient");
        }
        
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (!doctor.getAvailable()) {
            throw new RuntimeException("Doctor is not available");
        }
        
        Appointment appointment = Appointment.builder()
            .patient(patient)
            .doctor(doctor)
            .appointmentDate(request.getAppointmentDate())
            .reasonForVisit(request.getReasonForVisit())
            .symptoms(request.getSymptoms())
            .status("SCHEDULED")
            .durationMinutes(request.getDurationMinutes())
            .followUpRequired(false)
            .build();
        
        return appointmentRepository.save(appointment);
    }
    
    public List<Appointment> getPatientAppointments(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Patient patient = user.getPatient();
        if (patient == null) {
            throw new RuntimeException("User is not registered as a patient");
        }
        
        return appointmentRepository.findByPatientId(patient.getId());
    }
    
    public List<Appointment> getDoctorAppointments(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Doctor doctor = user.getDoctor();
        if (doctor == null) {
            throw new RuntimeException("User is not registered as a doctor");
        }
        
        return appointmentRepository.findByDoctorId(doctor.getId());
    }
    
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }
    
    @Transactional
    public Appointment updateAppointmentStatus(Long id, String status) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(status.toUpperCase());
        return appointmentRepository.save(appointment);
    }
    
    @Transactional
    public void cancelAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus("CANCELLED");
        appointmentRepository.save(appointment);
    }
}
