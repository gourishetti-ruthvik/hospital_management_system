-- Hospital Management System - Database Fix Script
-- This script fixes invalid date values that prevent the backend from starting

USE hospital_management;

-- Show current invalid dates
SELECT 'Current Invalid Appointments:' as Status, COUNT(*) as Count
FROM appointments 
WHERE appointment_date = '0000-00-00 00:00:00' OR appointment_date = '0000-00-00';

SELECT 'Current Invalid Prescriptions:' as Status, COUNT(*) as Count
FROM prescriptions 
WHERE start_date = '0000-00-00' OR start_date = '0000-00-00 00:00:00';

-- Fix appointments table by setting invalid dates to NULL
UPDATE appointments 
SET appointment_date = NULL 
WHERE appointment_date = '0000-00-00 00:00:00' OR appointment_date = '0000-00-00';

-- Fix prescriptions table by setting invalid dates to NULL
UPDATE prescriptions 
SET start_date = NULL 
WHERE start_date = '0000-00-00' OR start_date = '0000-00-00 00:00:00';

-- Verify the fix
SELECT 'After Fix - Invalid Appointments:' as Status, COUNT(*) as Count
FROM appointments 
WHERE appointment_date = '0000-00-00 00:00:00' OR appointment_date = '0000-00-00';

SELECT 'After Fix - Invalid Prescriptions:' as Status, COUNT(*) as Count
FROM prescriptions 
WHERE start_date = '0000-00-00' OR start_date = '0000-00-00 00:00:00';

SELECT 'Database Fixed Successfully!' as Message;
