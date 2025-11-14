# Hospital Management System - Backend

## Spring Boot REST API with JWT Authentication

### Technology Stack
- **Java**: 17
- **Spring Boot**: 3.2.0
- **Database**: MySQL 8
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Spring Security with BCrypt
- **Build Tool**: Maven
- **ORM**: Spring Data JPA / Hibernate

### Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/hospital/management/
│   │   │   ├── HospitalManagementApplication.java
│   │   │   ├── config/
│   │   │   │   ├── DataInitializer.java        # Auto-initializes roles on startup
│   │   │   ├── controller/
│   │   │   │   └── AuthController.java         # Login, register, auth check endpoints
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── SignupRequest.java
│   │   │   │   ├── JwtResponse.java
│   │   │   │   └── MessageResponse.java
│   │   │   ├── entity/
│   │   │   │   ├── BaseEntity.java             # Base with timestamps
│   │   │   │   ├── Role.java                   # ADMIN, DOCTOR, PATIENT
│   │   │   │   ├── User.java
│   │   │   │   ├── Doctor.java
│   │   │   │   ├── Patient.java
│   │   │   │   ├── Appointment.java
│   │   │   │   ├── Prescription.java
│   │   │   │   └── MedicalRecord.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── RoleRepository.java
│   │   │   │   ├── DoctorRepository.java
│   │   │   │   ├── PatientRepository.java
│   │   │   │   ├── AppointmentRepository.java
│   │   │   │   ├── PrescriptionRepository.java
│   │   │   │   └── MedicalRecordRepository.java
│   │   │   ├── security/
│   │   │   │   ├── JwtTokenProvider.java       # JWT generation & validation
│   │   │   │   ├── UserDetailsImpl.java        # Custom UserDetails
│   │   │   │   ├── UserDetailsServiceImpl.java # Load user by username
│   │   │   │   ├── JwtAuthenticationFilter.java # Filter to process JWT
│   │   │   │   ├── JwtAuthenticationEntryPoint.java # 401 handler
│   │   │   │   └── SecurityConfig.java         # Spring Security configuration
│   │   │   └── service/
│   │   │       └── AuthService.java            # Authentication business logic
│   │   └── resources/
│   │       ├── application.properties          # Base configuration
│   │       ├── application-dev.properties      # Development settings
│   │       └── application-prod.properties     # Production settings
│   └── test/
│       └── java/com/hospital/management/
│           └── HospitalManagementApplicationTests.java
├── pom.xml
└── create_database.sql

```

### Prerequisites

#### 1. Install Java 17 (or higher)
- Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- Verify installation: `java -version`

#### 2. Install Maven
- Download from [Apache Maven](https://maven.apache.org/download.cgi)
- Extract and add to PATH
- Verify installation: `mvn -version`

#### 3. Install MySQL
- Download from [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- Install and start MySQL service
- Note your root password

### Database Setup

#### Option 1: Automatic (Recommended)
The application will create tables automatically on first run using JPA's `spring.jpa.hibernate.ddl-auto=update`.

1. Create the database:
```sql
CREATE DATABASE hospital_management;
```

2. The DataInitializer will automatically create roles on startup.

#### Option 2: Manual
Run the `create_database.sql` script in MySQL:
```bash
mysql -u root -p < create_database.sql
```

### Configuration

Edit `src/main/resources/application-dev.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_management
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JWT Configuration
jwt.secret=YOUR_SECRET_KEY_HERE_MAKE_IT_LONG_AND_RANDOM_AT_LEAST_256_BITS
jwt.expiration=86400000
```

**Important**: Change `YOUR_MYSQL_PASSWORD` and `YOUR_SECRET_KEY_HERE...` to your actual values!

### Build and Run

#### 1. Build the project
```bash
cd backend
mvn clean install
```

#### 2. Run the application
```bash
# Development mode
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Or run the JAR
java -jar target/hospital-management-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

The server will start on: **http://localhost:8080**

### API Endpoints

#### Authentication (Public)
All auth endpoints are at: `http://localhost:8080/api/auth`

##### 1. Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "address": "123 Main St",
  "roles": ["patient"]
}
```

Response:
```json
{
  "message": "User registered successfully!"
}
```

##### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "roles": ["ROLE_PATIENT"]
}
```

##### 3. Check Authentication
```http
GET /api/auth/check
Authorization: Bearer YOUR_JWT_TOKEN
```

##### 4. Logout
```http
POST /api/auth/logout
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Protected Endpoints (Coming Soon)
- `/api/admin/**` - Admin-only endpoints (ROLE_ADMIN required)
- `/api/doctor/**` - Doctor endpoints (ROLE_DOCTOR or ROLE_ADMIN)
- `/api/patient/**` - Patient endpoints (ROLE_PATIENT or ROLE_ADMIN)

### Testing with cURL

#### Register a new patient:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "patient1",
    "email": "patient1@test.com",
    "password": "test123",
    "fullName": "Test Patient",
    "phoneNumber": "1234567890",
    "roles": ["patient"]
  }'
```

#### Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "patient1",
    "password": "test123"
  }'
```

#### Check auth (use token from login):
```bash
curl -X GET http://localhost:8080/api/auth/check \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Testing with Postman

1. Import the endpoints into Postman
2. Register a new user via `/api/auth/register`
3. Login via `/api/auth/login` and copy the `token`
4. For protected endpoints, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

### Security Features

1. **JWT Authentication**: Stateless token-based auth
2. **Password Encryption**: BCrypt with salt
3. **Role-Based Access Control**: ADMIN, DOCTOR, PATIENT roles
4. **CORS**: Configured for frontend (localhost:3000, 3001)
5. **Session Management**: Stateless (no server-side sessions)

### Database Schema

The application creates 8 main tables:
1. **roles** - User roles (ADMIN, DOCTOR, PATIENT)
2. **users** - User credentials and profile
3. **user_roles** - Many-to-many relationship
4. **doctors** - Doctor-specific information
5. **patients** - Patient-specific information
6. **appointments** - Patient-doctor appointments
7. **prescriptions** - Medication prescriptions
8. **medical_records** - Patient medical records

### Next Steps

#### Phase 2A: Complete Service Layer
- [ ] DoctorService - Doctor CRUD operations
- [ ] PatientService - Patient CRUD operations  
- [ ] AppointmentService - Appointment management
- [ ] PrescriptionService - Prescription management
- [ ] MedicalRecordService - Medical records management

#### Phase 2B: Complete Controller Layer
- [ ] AdminController - Admin dashboard & management
- [ ] DoctorController - Doctor operations
- [ ] PatientController - Patient operations

#### Phase 2C: Testing & Integration
- [ ] Unit tests for services
- [ ] Integration tests for controllers
- [ ] Connect frontend to backend APIs
- [ ] End-to-end testing

### Troubleshooting

#### Issue: "Access denied for user 'root'@'localhost'"
- Check MySQL is running: `mysql --version`
- Verify password in `application-dev.properties`
- Test connection: `mysql -u root -p`

#### Issue: "Table doesn't exist"
- Ensure `spring.jpa.hibernate.ddl-auto=update` in properties
- Or manually run `create_database.sql`

#### Issue: "Port 8080 already in use"
- Change port in `application.properties`:
  ```properties
  server.port=8081
  ```

#### Issue: Maven build fails
- Verify Java 17: `java -version`
- Verify Maven: `mvn -version`
- Clean and rebuild: `mvn clean install -U`

### Development Workflow

1. Make code changes
2. Build: `mvn clean compile`
3. Run tests: `mvn test`
4. Start server: `mvn spring-boot:run -Dspring-boot.run.profiles=dev`
5. Test with Postman/cURL
6. Commit changes

### Production Deployment

1. Set production environment variables:
   ```bash
   export DB_URL=jdbc:mysql://prod-server:3306/hospital_management
   export DB_USERNAME=prod_user
   export DB_PASSWORD=secure_password
   export JWT_SECRET=very_long_random_secret_key
   ```

2. Build production JAR:
   ```bash
   mvn clean package -Pprod
   ```

3. Run with production profile:
   ```bash
   java -jar target/hospital-management-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
   ```

### Project Status

✅ **Completed (Phase 2 - Part 1)**
- Project structure and Maven configuration
- Entity models with JPA relationships
- Repository layer with custom queries
- JWT security infrastructure
- Authentication endpoints (login, register)
- Role-based access control
- CORS configuration
- Database initialization

🚧 **In Progress (Phase 2 - Part 2)**
- Service layer for business logic
- Controller layer for additional endpoints
- Exception handling
- Input validation
- Integration testing

📋 **Planned (Phase 3)**
- Frontend-backend integration
- End-to-end testing
- Deployment configuration
- API documentation (Swagger)

---

**Backend Created By**: GitHub Copilot  
**Date**: December 2024  
**Version**: 1.0.0
