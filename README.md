# Hospital Management System

A comprehensive web-based hospital management system built with Spring Boot and React, deployed on Kubernetes.

## Overview

This application provides a complete solution for managing hospital operations including patient records, doctor appointments, prescriptions, medical records, and administrative tasks. The system supports role-based access control with three user roles: Admin, Doctor, and Patient.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven 3.9+
- **Validation**: Hibernate Validator

### Frontend
- **Framework**: React 18
- **UI**: Custom CSS with responsive design
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6
- **State Management**: React Context API

### Deployment
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions (optional)

## Features

### Admin Features
- Manage doctors and patients
- View and manage all appointments
- User role management
- System-wide statistics dashboard
- Generate reports

### Doctor Features
- View and manage assigned appointments
- Access patient medical records
- Create and manage prescriptions
- Update appointment status
- Patient history tracking

### Patient Features
- Search and view available doctors
- Book appointments with doctors
- View personal medical records
- Access prescriptions and history
- Update profile information
- Manage appointment bookings

## Architecture

The system follows a microservices-inspired architecture with:
- **Backend API**: RESTful Spring Boot application
- **Frontend SPA**: React single-page application
- **Database**: MySQL with persistent storage
- **Deployment**: Kubernetes with namespace isolation
- **Load Balancing**: NodePort services for external access

## Quick Start

### Prerequisites
- Docker Desktop with Kubernetes enabled
- kubectl CLI tool
- Java 17 or higher (for local development)
- Node.js 16+ and npm (for local development)
- Maven 3.9+ (for local development)

### Kubernetes Deployment (Recommended)

1. **Build Docker Images**:
```bash
# Build backend
docker build -f backend/Dockerfile -t hospitalapp/hospital-backend:latest ./backend

# Build frontend
docker build -f frontend/Dockerfile -t hospitalapp/hospital-frontend:latest ./frontend
```

2. **Deploy to Kubernetes**:
```bash
# Create namespace and deploy all resources
kubectl apply -f k8s/

# Verify deployment
kubectl get pods -n hospital-system
kubectl get services -n hospital-system
```

3. **Access the Application**:
- Frontend: http://localhost:30085
- Backend API: http://localhost:30086

### Local Development

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

#### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

### Database Setup

The application uses MySQL with the following default credentials:
- **Database**: `hospital_db`
- **Root Password**: `root123`
- **Application User**: `hospital_user`
- **Application Password**: `hospital_pass`

Database schema is automatically created by Spring Boot JPA.

### Default Users

After deployment, create users or use:
- **Admin**: Contact system administrator
- **Patient**: Register through the signup page (auto-assigned ROLE_PATIENT)
- **Doctor**: Contact admin for role assignment

## Project Structure

```
hospital_management_system/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/         # Java source code
│   │   └── com/hospital/management/
│   │       ├── controller/    # REST controllers
│   │       ├── service/       # Business logic
│   │       ├── entity/        # JPA entities
│   │       ├── repository/    # Data access layer
│   │       ├── dto/           # Data transfer objects
│   │       ├── security/      # JWT & security config
│   │       └── config/        # Application configuration
│   ├── src/main/resources/    # Configuration files
│   ├── Dockerfile             # Backend container image
│   └── pom.xml                # Maven dependencies
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── modules/           # Feature modules (admin, doctor, patient)
│   │   ├── services/          # API service layer
│   │   ├── context/           # React context providers
│   │   └── config/            # API configuration
│   ├── public/                # Static assets
│   ├── Dockerfile             # Frontend container image
│   ├── nginx.conf             # Nginx configuration
│   └── package.json           # Node dependencies
├── k8s/                        # Kubernetes manifests
│   ├── namespace.yaml         # hospital-system namespace
│   ├── mysql-pvc.yaml         # Persistent volume claim
│   ├── mysql-deployment.yaml  # MySQL database
│   ├── backend-deployment.yaml # Backend API
│   └── frontend-deployment.yaml # Frontend web app
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

### Admin APIs
- `GET /api/admin/users` - List all users
- `GET /api/admin/appointments` - View all appointments
- `POST /api/admin/doctors` - Create doctor profile
- `PUT /api/admin/users/{id}/role` - Update user role

### Doctor APIs
- `GET /api/doctor/appointments` - Get doctor's appointments
- `PUT /api/appointments/{id}/status` - Update appointment status
- `POST /api/prescriptions` - Create prescription
- `GET /api/medical-records/patient/{id}` - View patient records

### Patient APIs
- `GET /api/doctors` - Search available doctors
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/patient` - View my appointments
- `GET /api/prescriptions/patient` - View my prescriptions
- `GET /api/medical-records/patient` - View my medical records

## Security

- **JWT Authentication**: Stateless token-based auth
- **Role-Based Access Control**: Fine-grained permissions
- **Password Encryption**: BCrypt hashing
- **CORS Configuration**: Configured for cross-origin requests
- **SQL Injection Protection**: Prepared statements via JPA
- **XSS Protection**: React's built-in sanitization

## Kubernetes Resources

- **Namespace**: `hospital-system`
- **Deployments**: backend (2 replicas), frontend (2 replicas), mysql (1 replica)
- **Services**: 
  - `backend-service`: NodePort 30086
  - `frontend`: NodePort 30085
  - `mysql`: ClusterIP (internal)
- **Storage**: PersistentVolumeClaim for MySQL data
- **Resource Limits**: CPU and memory limits configured

## Troubleshooting

### Common Issues

1. **Pods not starting**: Check logs with `kubectl logs <pod-name> -n hospital-system`
2. **Database connection failed**: Ensure MySQL pod is running
3. **Port already in use**: Change NodePort values in k8s manifests
4. **Image pull errors**: Verify Docker images are built locally

### Useful Commands

```bash
# View all resources
kubectl get all -n hospital-system

# Check pod logs
kubectl logs deployment/backend -n hospital-system

# Access MySQL pod
kubectl exec -it <mysql-pod> -n hospital-system -- mysql -u root -proot123

# Restart deployment
kubectl rollout restart deployment/backend -n hospital-system

# Delete all resources
kubectl delete namespace hospital-system
```

## Development Guidelines

- Follow RESTful API conventions
- Use proper HTTP status codes
- Implement input validation on both frontend and backend
- Write meaningful commit messages
- Test thoroughly before deployment

## Future Enhancements

- Implement appointment reminder notifications
- Add video consultation feature
- Generate detailed analytics and reports
- Integrate payment gateway
- Add support for multiple hospitals
- Implement lab test management
- Add inventory and pharmacy management

## Contributing

This project is developed for educational purposes. Contributions and suggestions are welcome.

## License

This project is developed for educational purposes.

## Contact

For issues or questions, please create an issue in the repository.
