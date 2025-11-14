@echo off
echo ========================================
echo   DATABASE FIX - Hospital Management
echo ========================================
echo.
echo This will fix invalid dates in your database
echo.
pause
echo.
echo Running fix...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0FIX_DATABASE.ps1"
