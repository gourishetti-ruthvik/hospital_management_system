@echo off
echo =========================================
echo   Hospital Management System - FRONTEND
echo =========================================
echo.
echo Starting Frontend Development Server...
echo.

cd /d "%~dp0frontend"

echo Frontend will start on: http://localhost:3000
echo Please wait...
echo.

call npm start

pause
