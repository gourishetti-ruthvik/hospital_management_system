-- Test appointment booking by inserting directly into database
-- This bypasses the authentication issue temporarily

USE hospital_db;

-- Insert a test appointment for patient krish123 (patient_id=1) with doctor kbp321 (doctor_id=1)
INSERT INTO appointments (
    patient_id,
    doctor_id,
    appointment_date,
    reason_for_visit,
    symptoms,
    duration_minutes,
    status,
    created_at
) VALUES (
    1,  -- krish123's patient_id
    1,  -- Dr. kbp321's doctor_id
    '2025-12-01 10:00:00',  -- Appointment date/time
    'Regular checkup',
    'None',
    30,
    'SCHEDULED',
    NOW()
);

-- Verify the appointment was created
SELECT 
    a.id,
    p.user_id as patient_user_id,
    u1.username as patient_username,
    d.user_id as doctor_user_id,
    u2.username as doctor_username,
    a.appointment_date,
    a.reason_for_visit,
    a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN users u1 ON p.user_id = u1.id
JOIN doctors d ON a.doctor_id = d.id
JOIN users u2 ON d.user_id = u2.id
WHERE a.id = LAST_INSERT_ID();
