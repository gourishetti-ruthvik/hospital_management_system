# Hospital Management System

A comprehensive web-based hospital management system built with Spring Boot and React.

## Overview

This application provides a complete solution for managing hospital operations including patient records, doctor appointments, prescriptions, and administrative tasks. The system supports role-based access control with three user roles: Admin, Doctor, and Patient.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **UI**: Custom CSS with responsive design
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## Features

### Admin
- Manage doctors and patients
- View and manage appointments
- Generate system reports
- User role management

### Doctor
- View and manage appointments
- Access patient medical records
- Create and manage prescriptions
- Update patient information

### Patient
- Book appointments with doctors
- View personal medical records
- Access prescriptions
- Update profile information

## Quick Start

### Prerequisites
- Java 17 or higher
- Node.js and npm
- MySQL Server
- Maven 3.9+

### Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE hospital_management_db;
```

2. Update database credentials in `backend/src/main/resources/application-dev.properties`

### Running the Application

#### Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/hospital-management-system-1.0.0.jar
```
Backend runs on: http://localhost:8080

#### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

### Default Access
- Register as a new user to get Patient role
- Contact admin for Doctor or Admin role assignment

## Project Structure

```
hospital_management_system/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml             # Maven dependencies
├── frontend/               # React frontend
│   ├── src/                # React components
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
└── README.md              # This file
```

## API Documentation

The backend provides RESTful APIs for:
- Authentication (`/auth/**`)
- Admin operations (`/admin/**`)
- Doctor operations (`/doctor/**`)
- Patient operations (`/patient/**`)

## Security

- JWT-based authentication
- Role-based access control
- Password encryption with BCrypt
- CORS configuration for localhost development

## License

This project is developed for educational purposes.
