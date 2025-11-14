-- Hospital Management System Database Creation
-- This script creates the database and all necessary tables

DROP DATABASE IF EXISTS hospital_management;
CREATE DATABASE hospital_management;
USE hospital_management;

-- The tables will be created automatically by Spring Boot JPA
-- This script is for reference and manual database creation if needed

-- Create roles table first
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO roles (name) VALUES ('ROLE_DOCTOR');
INSERT INTO roles (name) VALUES ('ROLE_PATIENT');

-- Create admin user
-- Password: admin123 (encoded with BCrypt)
-- You should change this password after first login
INSERT INTO users (username, email, password, full_name, phone_number, address, active, created_at, updated_at)
VALUES (
    'admin',
    'admin@hospital.com',
    '$2a$10$YourBCryptHashHere', -- This needs to be generated
    'System Administrator',
    '1234567890',
    'Hospital Main Office',
    true,
    NOW(),
    NOW()
);

-- Assign admin role to admin user
-- This will be done after Spring Boot creates the tables
