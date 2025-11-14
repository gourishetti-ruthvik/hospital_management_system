@echo off
echo ========================================
echo   Hospital Management System - BACKEND
echo ========================================
echo.
echo Starting Backend Server...
echo.

cd /d "%~dp0backend"

set JAVA_HOME=C:\Program Files\Java\jdk-21
set PATH=%JAVA_HOME%\bin;%PATH%

echo Backend will start on: http://localhost:8080/api
echo.

java -jar target\hospital-management-system-1.0.0.jar

pause
