# Hospital Management System - Database Fix Script (PowerShell)
# This script fixes invalid date values in the database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DATABASE FIX SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# MySQL connection details
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$username = "root"
$password = "003318*s"
$database = "hospital_management"

# Check if MySQL is installed
if (-not (Test-Path $mysqlPath)) {
    Write-Host "❌ MySQL not found at: $mysqlPath" -ForegroundColor Red
    Write-Host "Please install MySQL or update the path in this script." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Run the SQL fix manually in MySQL Workbench:" -ForegroundColor Yellow
    Write-Host "   1. Open MySQL Workbench" -ForegroundColor White
    Write-Host "   2. Open file: backend\fix_database_dates.sql" -ForegroundColor White
    Write-Host "   3. Click Execute" -ForegroundColor White
    pause
    exit
}

Write-Host "📋 Fixing invalid dates in database: $database" -ForegroundColor Yellow
Write-Host ""

# SQL commands to fix the database
$sqlCommands = @"
USE $database;

-- Show current invalid dates
SELECT 'Current Invalid Appointments:' as Status, COUNT(*) as Count
FROM appointments 
WHERE appointment_date = '0000-00-00 00:00:00' OR appointment_date = '0000-00-00';

SELECT 'Current Invalid Prescriptions:' as Status, COUNT(*) as Count
FROM prescriptions 
WHERE start_date = '0000-00-00' OR start_date = '0000-00-00 00:00:00';

-- Fix appointments table
UPDATE appointments 
SET appointment_date = NULL 
WHERE appointment_date = '0000-00-00 00:00:00' OR appointment_date = '0000-00-00';

-- Fix prescriptions table
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

SELECT '✅ Database Fixed Successfully!' as Message;
"@

# Execute SQL commands
try {
    $sqlCommands | & $mysqlPath -u $username -p$password 2>&1 | ForEach-Object {
        if ($_ -match "ERROR") {
            Write-Host $_ -ForegroundColor Red
        } else {
            Write-Host $_
        }
    }
    
    Write-Host ""
    Write-Host "✅ Database fix completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Double-click START_BACKEND.bat" -ForegroundColor White
    Write-Host "  2. Double-click START_FRONTEND.bat" -ForegroundColor White
    Write-Host "  3. Go to http://localhost:3000" -ForegroundColor White
    Write-Host "  4. Register or Login!" -ForegroundColor White
} catch {
    Write-Host "❌ Error fixing database: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run the SQL fix manually in MySQL Workbench:" -ForegroundColor Yellow
    Write-Host "   1. Open MySQL Workbench" -ForegroundColor White
    Write-Host "   2. Open file: backend\fix_database_dates.sql" -ForegroundColor White
    Write-Host "   3. Click Execute" -ForegroundColor White
}

Write-Host ""
pause
