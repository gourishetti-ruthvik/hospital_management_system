@echo off
echo ======================================
echo Hospital Management System - Backend
echo ======================================
echo.

REM Set JAVA_HOME to JDK 21
set JAVA_HOME=C:\Program Files\Java\jdk-21
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Maven path
set MAVEN_HOME=C:\apache-maven-3.9.9
set PATH=%MAVEN_HOME%\bin;%PATH%

echo Java Version:
java -version
echo.

echo Maven Version:
mvn -version
echo.

echo Starting Spring Boot Application...
echo Active Profile: dev
echo Server: http://localhost:8080
echo.

mvn spring-boot:run -Dspring-boot.run.profiles=dev

pause
