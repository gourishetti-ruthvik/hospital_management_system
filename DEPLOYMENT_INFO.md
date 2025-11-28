# Hospital Management System - Deployment Information

## Deployment Architecture

### Technology Stack
- **Container Orchestration:** Kubernetes (Docker Desktop)
- **Automation:** Ansible
- **Database:** MySQL 8.0 with Persistent Volume (10Gi)
- **Backend:** Spring Boot 3.2.0 (Java 17) with JWT Authentication
- **Frontend:** React 18 with Nginx Reverse Proxy
- **High Availability:** 2 replicas each for frontend and backend

### Deployment Command
```bash
ansible-playbook ansible/deploy-k8s.yml
```

## Access Information

### Application URLs
- **Frontend:** http://localhost:30085
- **Backend API:** http://localhost:30086
- **Backend Health:** http://localhost:30086/actuator/health

### Default Credentials

#### Administrator
- **Username:** `admin`
- **Password:** `Admin@123`
- **Email:** admin@hospital.com
- **Role:** Full system administration access

#### Sample Doctors
All doctors have the password: `Doctor@123`

1. **Dr. John Smith** - Cardiology
   - Username: `dr.smith`
   - Email: john.smith@hospital.com
   - Specialization: Cardiology
   - Experience: 10 years
   - Fee: ₹500

2. **Dr. Emily Johnson** - Orthopedics
   - Username: `dr.johnson`
   - Email: emily.johnson@hospital.com
   - Specialization: Orthopedics
   - Experience: 8 years
   - Fee: ₹450

3. **Dr. Michael Williams** - Pediatrics
   - Username: `dr.williams`
   - Email: michael.williams@hospital.com
   - Specialization: Pediatrics
   - Experience: 12 years
   - Fee: ₹400

4. **Dr. Sarah Davis** - Dermatology
   - Username: `dr.davis`
   - Email: sarah.davis@hospital.com
   - Specialization: Dermatology
   - Experience: 7 years
   - Fee: ₹380

5. **Dr. Robert Brown** - Neurology
   - Username: `dr.brown`
   - Email: robert.brown@hospital.com
   - Specialization: Neurology
   - Experience: 15 years
   - Fee: ₹600

#### Sample Patient
- **Username:** `patient1`
- **Password:** `Patient@123`
- **Email:** patient1@example.com
- **Full Name:** John Doe
- **Blood Group:** O+

## Testing Patient Features

### Step 1: Login as Patient
1. Open http://localhost:30085
2. Login with credentials: `patient1` / `Patient@123`

### Step 2: Find Doctors
1. Navigate to "Find Doctors" from the patient dashboard
2. You should see 5 available doctors with their specializations
3. Use the search bar to filter by name or specialization
4. Filter by specialization using the dropdown

### Step 3: Book Appointment
1. Click "Book Appointment" from the dashboard or doctor card
2. Select a doctor from the available doctors list
3. Choose appointment date (today or future)
4. Select preferred time
5. Enter reason for visit (required)
6. Optionally add symptoms
7. Click "Book Appointment"
8. You should see a success message

### Step 4: View Appointments
1. Navigate to "My Appointments" from the patient dashboard
2. You should see your booked appointment(s)
3. You can view appointment status (PENDING, CONFIRMED, COMPLETED, CANCELLED)

## Kubernetes Resources

### Namespace
```bash
kubectl get all -n hospital-system
```

### Pods
```bash
kubectl get pods -n hospital-system
```

Expected output:
- 2 backend pods (Running)
- 2 frontend pods (Running)
- 1 MySQL pod (Running)

### Services
```bash
kubectl get svc -n hospital-system
```

Expected services:
- `frontend-service` - NodePort 30085
- `backend-service` - NodePort 30086
- `mysql-service` - ClusterIP (internal)

### Logs
```bash
# Backend logs
kubectl logs -f deployment/backend -n hospital-system

# Frontend logs
kubectl logs -f deployment/frontend -n hospital-system

# MySQL logs
kubectl logs -f deployment/mysql -n hospital-system
```

## Architecture Highlights

### CORS Configuration
Backend configured to accept requests from:
- All origins (using pattern matching for flexibility)
- Credentials enabled for JWT authentication

### Nginx Reverse Proxy
Frontend nginx configuration proxies:
- `/api/*` → `http://backend-service:8080/api/`
- `/auth/*` → `http://backend-service:8080/auth/`

This allows the React app to use relative URLs without knowing the backend location.

### Health Checks
- **Backend:** Liveness and readiness probes on `/actuator/health`
- **MySQL:** Custom health check using `mysqladmin ping`
- **Frontend:** Nginx health check on root path

### Resource Limits
**Backend:**
- Requests: 250m CPU, 512Mi Memory
- Limits: 500m CPU, 1Gi Memory

**Frontend:**
- Requests: 100m CPU, 128Mi Memory
- Limits: 200m CPU, 256Mi Memory

**MySQL:**
- Requests: 250m CPU, 512Mi Memory
- Limits: 500m CPU, 1Gi Memory

## Database Schema

The application automatically creates and migrates the database schema on startup using Hibernate with the following entities:

- **Users** - System users with roles
- **Roles** - ROLE_ADMIN, ROLE_DOCTOR, ROLE_PATIENT
- **Doctors** - Doctor profiles with specializations
- **Patients** - Patient profiles with medical information
- **Appointments** - Appointment bookings
- **Prescriptions** - Medical prescriptions
- **Medical Records** - Patient medical history

## Data Initialization

The `DataInitializer` component automatically creates:
1. Three roles (ADMIN, DOCTOR, PATIENT)
2. One admin user
3. Five sample doctors (one for each major specialization)
4. One sample patient

This happens only on first startup when the database is empty.

## Troubleshooting

### Pods not starting
```bash
kubectl describe pod <pod-name> -n hospital-system
```

### Database connection issues
```bash
kubectl logs deployment/backend -n hospital-system | grep -i error
```

### Frontend not loading doctors
1. Check backend health: http://localhost:30086/actuator/health
2. Test doctors API: http://localhost:30086/api/doctors
3. Check browser console for CORS errors

### Reset deployment
```bash
kubectl delete namespace hospital-system
ansible-playbook ansible/deploy-k8s.yml
```

## Security Notes

⚠️ **Important:** The default credentials provided are for development/demo purposes only. In production:
1. Change all default passwords
2. Use environment-specific secrets
3. Enable HTTPS/TLS
4. Restrict CORS to specific origins
5. Implement proper backup strategies
6. Use managed database services with encryption
7. Enable pod security policies
8. Implement network policies

## Support

For issues or questions during review, check:
1. Pod status: `kubectl get pods -n hospital-system`
2. Pod logs: `kubectl logs <pod-name> -n hospital-system`
3. Service endpoints: `kubectl get svc -n hospital-system`
4. Backend health: http://localhost:30086/actuator/health
