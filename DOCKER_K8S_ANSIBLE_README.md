# 🏥 Hospital Management System - Deployment Package

Complete production-ready deployment solution with Docker, Kubernetes, GitHub Actions CI/CD, and Ansible automation.

## 📦 What's Included

### ✅ Step 1 & 2: Application (Already Complete)
- ✅ React Frontend (with JWT authentication)
- ✅ Spring Boot Backend (with role-based access control)
- ✅ MySQL Database
- ✅ CRUD operations for Doctors, Patients, Appointments, Prescriptions, Medical Records
- ✅ Admin, Doctor, and Patient roles
- ✅ Default admin user (username: `admin`, password: `Admin@123`)

### ✅ Step 3: Docker & GitHub Actions CI/CD (NEW)
- ✅ Optimized multi-stage Dockerfiles
- ✅ GitHub Actions workflow for automated builds
- ✅ Automatic push to Docker Hub
- ✅ Security scanning with Trivy
- ✅ Support for multiple platforms (AMD64, ARM64)

### ✅ Step 4: Kubernetes Deployment (NEW)
- ✅ Complete K8s manifests (Deployments, Services, ConfigMaps, Secrets)
- ✅ MySQL with persistent storage
- ✅ Horizontal Pod Autoscaling (HPA)
- ✅ Ingress configuration
- ✅ Health checks and resource limits
- ✅ Rolling updates with zero downtime

### ✅ Step 5: Ansible Automation (NEW)
- ✅ Complete automation playbooks
- ✅ One-command deployment
- ✅ Build and push Docker images
- ✅ Deploy to Kubernetes
- ✅ Undeploy functionality
- ✅ Prerequisites installation

---

## 🚀 Quick Start (3 Commands)

### 1. Update Docker Hub Username

**Edit these 3 files with your Docker Hub username:**
```bash
# 1. k8s/backend-deployment.yaml (line 36)
# 2. k8s/frontend-deployment.yaml (line 25)  
# 3. ansible/group_vars/all.yml (line 3)
```

### 2. Build & Push Images

```bash
cd ansible
ansible-playbook build-push-images.yml
```

### 3. Deploy to Kubernetes

```bash
ansible-playbook deploy-k8s.yml
```

**That's it!** 🎉

---

## 📂 Project Structure

```
hospital_management_system/
├── frontend/                    # React Frontend
│   ├── Dockerfile              # ✨ Multi-stage build
│   ├── nginx.conf              # ✨ Nginx configuration
│   ├── .dockerignore           # ✨ Docker optimization
│   ├── src/
│   └── package.json
│
├── backend/                     # Spring Boot Backend
│   ├── Dockerfile              # ✨ Multi-stage build
│   ├── .dockerignore           # ✨ Docker optimization
│   ├── pom.xml                 # ✨ Added Actuator
│   └── src/
│
├── k8s/                        # ✨ Kubernetes Manifests
│   ├── namespace.yaml          # Namespace definition
│   ├── configmaps.yaml         # Application configuration
│   ├── secrets.yaml            # Sensitive data
│   ├── mysql-pvc.yaml          # Persistent storage
│   ├── mysql-deployment.yaml   # MySQL database
│   ├── backend-deployment.yaml # Backend API
│   ├── frontend-deployment.yaml# Frontend app
│   ├── ingress.yaml            # Ingress rules
│   └── hpa.yaml                # Auto-scaling
│
├── ansible/                    # ✨ Ansible Automation
│   ├── ansible.cfg             # Ansible configuration
│   ├── inventory.ini           # Host inventory
│   ├── group_vars/all.yml      # Variables
│   ├── main.yml                # Complete pipeline
│   ├── deploy-k8s.yml          # K8s deployment
│   ├── build-push-images.yml   # Docker build/push
│   ├── undeploy-k8s.yml        # Cleanup
│   └── setup-prerequisites.yml # Prerequisites
│
├── .github/workflows/          # ✨ GitHub Actions
│   └── docker-build-push.yml   # CI/CD pipeline
│
└── ✨ Documentation
    ├── DEPLOYMENT_GUIDE.md     # Complete deployment guide
    ├── QUICK_DEPLOY.md         # Quick reference
    ├── ANSIBLE_SETUP.md        # Ansible installation
    └── ADMIN_FEATURES_SUMMARY.md
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** | 📖 Complete step-by-step deployment guide |
| **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** | ⚡ Quick commands and troubleshooting |
| **[ANSIBLE_SETUP.md](ANSIBLE_SETUP.md)** | 🤖 Ansible installation for all platforms |
| **[ADMIN_FEATURES_SUMMARY.md](ADMIN_FEATURES_SUMMARY.md)** | 👤 Admin features documentation |

---

## 🔧 Prerequisites

### Required Tools

1. **Docker** (v20.10+)
   - [Download for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - [Download for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - [Install on Linux](https://docs.docker.com/engine/install/)

2. **kubectl** (v1.28+)
   - [Installation Guide](https://kubernetes.io/docs/tasks/tools/)

3. **Kubernetes Cluster**
   - [Minikube](https://minikube.sigs.k8s.io/docs/start/) (for local testing)
   - [Docker Desktop Kubernetes](https://docs.docker.com/desktop/kubernetes/)
   - Cloud: EKS, GKE, or AKS

4. **Ansible** (v2.12+)
   - See [ANSIBLE_SETUP.md](ANSIBLE_SETUP.md) for detailed installation

### Required Accounts

- **Docker Hub**: [Create account](https://hub.docker.com/signup)
- **GitHub**: For CI/CD (optional but recommended)

---

## 🎯 Deployment Options

### Option 1: Ansible (Recommended) ⭐

**Complete pipeline in one command:**
```bash
cd ansible
ansible-playbook main.yml
```

**Or step by step:**
```bash
# 1. Build and push images
ansible-playbook build-push-images.yml

# 2. Deploy to Kubernetes
ansible-playbook deploy-k8s.yml

# 3. Undeploy (cleanup)
ansible-playbook undeploy-k8s.yml
```

### Option 2: GitHub Actions

**Automatic builds on push:**
1. Configure GitHub Secrets (see below)
2. Push to main branch
3. Images built automatically
4. Then deploy with:
   ```bash
   cd ansible
   ansible-playbook deploy-k8s.yml
   ```

### Option 3: Manual kubectl

```bash
cd k8s
kubectl apply -f namespace.yaml
kubectl apply -f configmaps.yaml
kubectl apply -f secrets.yaml
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deployment.yaml
kubectl wait --for=condition=ready pod -l app=mysql -n hospital-system --timeout=300s
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

---

## ⚙️ Configuration Required

### 1. Docker Hub Username

Update in **3 files**:

**File 1: `k8s/backend-deployment.yaml`**
```yaml
# Line 36
image: YOUR_DOCKERHUB_USERNAME/hospital-backend:latest
```

**File 2: `k8s/frontend-deployment.yaml`**
```yaml
# Line 25
image: YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest
```

**File 3: `ansible/group_vars/all.yml`**
```yaml
# Line 3
dockerhub_username: "YOUR_DOCKERHUB_USERNAME"
dockerhub_password: "YOUR_DOCKERHUB_PASSWORD"
```

### 2. GitHub Secrets (for CI/CD)

Navigate to: **Settings → Secrets and variables → Actions**

Add secrets:
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password/token

### 3. Kubernetes Cluster

**Start Minikube:**
```bash
minikube start --cpus=4 --memory=8192 --driver=docker
minikube addons enable metrics-server
```

**Or enable Docker Desktop Kubernetes:**
- Settings → Kubernetes → Enable Kubernetes

---

## 🌐 Access the Application

### Start Port Forwarding

```bash
# Frontend
kubectl port-forward -n hospital-system svc/frontend-service 8080:80

# Backend API
kubectl port-forward -n hospital-system svc/backend-service 8090:8080
```

### Access URLs

- **Frontend**: http://localhost:8080
- **Backend Health**: http://localhost:8090/actuator/health
- **Backend API**: http://localhost:8090/api

### Default Credentials

**Admin User:**
- Username: `admin`
- Password: `Admin@123`
- Email: `admin@hospital.com`

---

## 🔍 Monitoring & Management

### Check Deployment Status

```bash
# All resources
kubectl get all -n hospital-system

# Pods
kubectl get pods -n hospital-system

# Services
kubectl get svc -n hospital-system

# Logs
kubectl logs -f deployment/backend -n hospital-system
kubectl logs -f deployment/frontend -n hospital-system
```

### Scale Application

```bash
# Manual scaling
kubectl scale deployment backend --replicas=3 -n hospital-system

# Auto-scaling status
kubectl get hpa -n hospital-system
```

### Update After Code Changes

```bash
# Build and push new images
cd ansible
ansible-playbook build-push-images.yml

# Restart deployments
kubectl rollout restart deployment/backend -n hospital-system
kubectl rollout restart deployment/frontend -n hospital-system

# Check rollout status
kubectl rollout status deployment/backend -n hospital-system
```

---

## 🧹 Cleanup

### Remove All Resources

```bash
# Using Ansible
cd ansible
ansible-playbook undeploy-k8s.yml

# Or using kubectl
kubectl delete namespace hospital-system

# Stop Minikube
minikube stop
minikube delete
```

---

## 🛠️ Architecture

### System Architecture

```
                                Internet
                                   ↓
                            [Load Balancer]
                                   ↓
                          [Ingress Controller]
                            ↙            ↘
                    [Frontend]      [Backend]
                    (React+Nginx)   (Spring Boot)
                    Replicas: 2     Replicas: 2
                                        ↓
                                   [MySQL]
                                   (Persistent)
```

### Container Architecture

**Frontend Container:**
- Stage 1: Node.js build
- Stage 2: Nginx serving static files
- Size: ~50MB

**Backend Container:**
- Stage 1: Maven build
- Stage 2: JRE runtime
- Size: ~250MB

### Deployment Flow

```
Developer → GitHub → GitHub Actions → Docker Hub → Kubernetes
              ↓
         Ansible Automation
              ↓
    [Build] → [Push] → [Deploy]
```

---

## 🎓 Features Implemented

### Application Features ✅
- JWT Authentication
- Role-based Access Control (Admin, Doctor, Patient)
- User Management (CRUD)
- Doctor Management
- Patient Management
- Appointment Booking
- Prescription Management
- Medical Records
- Default Admin User

### DevOps Features ✅
- Multi-stage Docker builds
- Container optimization
- GitHub Actions CI/CD
- Automated testing and security scanning
- Kubernetes orchestration
- Auto-scaling (HPA)
- Health checks and liveness probes
- Persistent storage
- Configuration management (ConfigMaps/Secrets)
- Ansible automation
- Rolling updates
- Zero-downtime deployment

---

## 📊 Resource Requirements

### Minimum (Development)
- CPU: 4 cores
- RAM: 8 GB
- Storage: 20 GB

### Recommended (Production)
- CPU: 8 cores
- RAM: 16 GB
- Storage: 50 GB

### Kubernetes Resources
- MySQL: 512Mi-1Gi RAM, 250m-500m CPU
- Backend: 512Mi-1Gi RAM, 250m-500m CPU (per replica)
- Frontend: 128Mi-256Mi RAM, 100m-200m CPU (per replica)

---

## 🔐 Security Features

- JWT token-based authentication
- Password encryption (BCrypt)
- Role-based authorization
- Kubernetes Secrets for sensitive data
- Security scanning with Trivy
- Network policies (configurable)
- HTTPS/TLS support (via Ingress)
- Health check endpoints
- Non-root container users

---

## 🐛 Troubleshooting

### Common Issues

**Pods not starting:**
```bash
kubectl describe pod POD_NAME -n hospital-system
kubectl logs POD_NAME -n hospital-system
```

**Database connection issues:**
```bash
# Check MySQL is ready
kubectl get pod -l app=mysql -n hospital-system

# Test connection
kubectl exec -it MYSQL_POD -n hospital-system -- mysql -u hospital_user -p
```

**Image pull errors:**
```bash
# Verify image names
docker pull YOUR_USERNAME/hospital-frontend:latest

# Check deployment configuration
kubectl get deployment backend -n hospital-system -o yaml | grep image
```

See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for more troubleshooting tips.

---

## 📞 Support

- 📖 **Full Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- ⚡ **Quick Reference**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- 🤖 **Ansible Setup**: [ANSIBLE_SETUP.md](ANSIBLE_SETUP.md)
- 💬 **Issues**: Check logs with `kubectl logs -f deployment/NAME -n hospital-system`

---

## 📝 License

This project is provided for educational and deployment purposes.

---

## 🎉 Ready to Deploy!

Your Hospital Management System is now production-ready with:

✅ Dockerized containers  
✅ CI/CD pipeline  
✅ Kubernetes orchestration  
✅ Ansible automation  
✅ Complete documentation

**Start deploying:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

**Happy Deploying! 🚀**
