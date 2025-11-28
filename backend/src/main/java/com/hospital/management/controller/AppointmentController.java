package com.hospital.management.controller;

import com.hospital.management.dto.AppointmentRequest;
import com.hospital.management.dto.MessageResponse;
import com.hospital.management.entity.Appointment;
import com.hospital.management.security.UserDetailsImpl;
import com.hospital.management.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppointmentController {
    
    private final AppointmentService appointmentService;
    
    @PostMapping
    public ResponseEntity<?> bookAppointment(
            @Valid @RequestBody AppointmentRequest request,
            @RequestParam(required = false) Long userId) {
        try {
            // TEMPORARY: Use userId from request parameter for testing
            Long patientId = userId != null ? userId : 2L; // Default to patient krish123 (id=2)
            Appointment appointment = appointmentService.bookAppointment(request, patientId);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/patient")
    public ResponseEntity<List<Appointment>> getPatientAppointments(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(appointmentService.getPatientAppointments(userDetails.getId()));
    }
    
    @GetMapping("/doctor")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(appointmentService.getDoctorAppointments(userDetails.getId()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            Appointment appointment = appointmentService.updateAppointmentStatus(id, status);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        try {
            appointmentService.cancelAppointment(id);
            return ResponseEntity.ok(new MessageResponse("Appointment cancelled successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
