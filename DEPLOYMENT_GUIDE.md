# Hospital Management System - Deployment Guide

Complete guide for deploying the Hospital Management System with Docker, Kubernetes, and Ansible automation.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Docker Setup](#docker-setup)
3. [GitHub Actions CI/CD](#github-actions-cicd)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [Ansible Automation](#ansible-automation)
6. [Accessing the Application](#accessing-the-application)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software

1. **Docker** (v20.10+)
   ```bash
   # Windows (PowerShell as Admin)
   winget install Docker.DockerDesktop
   
   # Linux
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

2. **kubectl** (v1.28+)
   ```bash
   # Windows
   winget install Kubernetes.kubectl
   
   # Linux
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
   ```

3. **Ansible** (v2.12+)
   ```bash
   # Windows (WSL2 required)
   pip install ansible
   
   # Linux
   sudo apt update
   sudo apt install ansible -y
   ```

4. **Kubernetes Cluster**
   - Minikube (for local testing)
   - Docker Desktop Kubernetes
   - Cloud providers (EKS, GKE, AKS)

### Accounts Required

- **Docker Hub Account**: [hub.docker.com](https://hub.docker.com)
- **GitHub Account**: For GitHub Actions

---

## 🐳 Docker Setup

### Step 1: Create Docker Hub Repository

1. Login to [Docker Hub](https://hub.docker.com)
2. Create two repositories:
   - `hospital-frontend`
   - `hospital-backend`
3. Note your Docker Hub username

### Step 2: Update Configuration Files

Update the following files with your Docker Hub username:

1. **k8s/backend-deployment.yaml** (line 36):
   ```yaml
   image: YOUR_DOCKERHUB_USERNAME/hospital-backend:latest
   ```

2. **k8s/frontend-deployment.yaml** (line 25):
   ```yaml
   image: YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest
   ```

3. **ansible/group_vars/all.yml** (line 3):
   ```yaml
   dockerhub_username: "YOUR_DOCKERHUB_USERNAME"
   ```

### Step 3: Build Docker Images Locally (Optional)

```bash
# Frontend
cd frontend
docker build -t YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest .

# Backend
cd ../backend
docker build -t YOUR_DOCKERHUB_USERNAME/hospital-backend:latest .

# Push to Docker Hub
docker login
docker push YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest
docker push YOUR_DOCKERHUB_USERNAME/hospital-backend:latest
```

---

## 🔄 GitHub Actions CI/CD

### Step 1: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

   | Secret Name | Value |
   |-------------|-------|
   | `DOCKER_USERNAME` | Your Docker Hub username |
   | `DOCKER_PASSWORD` | Your Docker Hub password/token |

### Step 2: Trigger Workflow

The GitHub Actions workflow automatically triggers on:
- Push to `main` or `master` branch
- Pull requests to these branches
- Manual trigger via **Actions** tab

**Workflow does:**
1. ✅ Builds frontend Docker image
2. ✅ Builds backend Docker image
3. ✅ Pushes images to Docker Hub
4. ✅ Runs security scans with Trivy
5. ✅ Tags images with branch name and commit SHA

### Step 3: Verify Build

```bash
# Check workflow status
# Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

# Pull images locally
docker pull YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest
docker pull YOUR_DOCKERHUB_USERNAME/hospital-backend:latest
```

---

## ☸️ Kubernetes Deployment

### Step 1: Start Kubernetes Cluster

**Using Minikube:**
```bash
# Start cluster
minikube start --cpus=4 --memory=8192 --driver=docker

# Enable metrics server (for HPA)
minikube addons enable metrics-server

# Verify cluster
kubectl cluster-info
kubectl get nodes
```

**Using Docker Desktop:**
1. Open Docker Desktop
2. Settings → Kubernetes → Enable Kubernetes
3. Wait for cluster to start

### Step 2: Deploy with kubectl

```bash
cd k8s

# Create namespace
kubectl apply -f namespace.yaml

# Apply configurations
kubectl apply -f configmaps.yaml
kubectl apply -f secrets.yaml

# Deploy MySQL
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deployment.yaml

# Wait for MySQL to be ready
kubectl wait --for=condition=ready pod -l app=mysql -n hospital-system --timeout=300s

# Deploy Backend
kubectl apply -f backend-deployment.yaml

# Wait for Backend
kubectl wait --for=condition=ready pod -l app=backend -n hospital-system --timeout=300s

# Deploy Frontend
kubectl apply -f frontend-deployment.yaml

# Optional: Apply Ingress and HPA
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```

### Step 3: Verify Deployment

```bash
# Check all resources
kubectl get all -n hospital-system

# Check pod status
kubectl get pods -n hospital-system

# Check services
kubectl get svc -n hospital-system

# View pod logs
kubectl logs -f deployment/backend -n hospital-system
kubectl logs -f deployment/frontend -n hospital-system
kubectl logs -f deployment/mysql -n hospital-system
```

### Step 4: Access Application

**Get Frontend Service:**
```bash
kubectl get svc frontend-service -n hospital-system
```

**Access Methods:**

1. **LoadBalancer (Cloud):**
   ```bash
   # Get external IP
   kubectl get svc frontend-service -n hospital-system
   # Access: http://EXTERNAL-IP
   ```

2. **NodePort (Minikube):**
   ```bash
   minikube service frontend-service -n hospital-system
   ```

3. **Port Forward (Development):**
   ```bash
   # Frontend
   kubectl port-forward -n hospital-system svc/frontend-service 8080:80
   # Access: http://localhost:8080
   
   # Backend
   kubectl port-forward -n hospital-system svc/backend-service 8090:8080
   # Access: http://localhost:8090
   ```

---

## 🤖 Ansible Automation

### Step 1: Install Ansible

```bash
# Windows (WSL2)
pip install ansible

# Linux
sudo apt update
sudo apt install ansible python3-pip -y

# Install required collections and modules
pip install kubernetes docker openshift
ansible-galaxy collection install kubernetes.core
ansible-galaxy collection install community.docker
```

### Step 2: Configure Ansible

1. **Update inventory.ini** (if deploying to remote hosts):
   ```ini
   [kubernetes_cluster]
   k8s-master ansible_host=YOUR_IP ansible_user=YOUR_USER
   ```

2. **Update group_vars/all.yml**:
   ```yaml
   dockerhub_username: "YOUR_DOCKERHUB_USERNAME"
   dockerhub_password: "YOUR_DOCKERHUB_PASSWORD"
   ```

### Step 3: Run Ansible Playbooks

**Option 1: Complete Pipeline**
```bash
cd ansible

# Run complete CI/CD pipeline (build + deploy)
ansible-playbook main.yml
```

**Option 2: Individual Steps**
```bash
# Only build and push images
ansible-playbook build-push-images.yml

# Only deploy to Kubernetes
ansible-playbook deploy-k8s.yml

# Undeploy from Kubernetes
ansible-playbook undeploy-k8s.yml
```

**Option 3: Setup Prerequisites**
```bash
# Install required tools (kubectl, docker, etc.)
ansible-playbook setup-prerequisites.yml
```

### Step 4: Verify Deployment

```bash
# Check deployment status
ansible-playbook deploy-k8s.yml --tags verify

# Or use kubectl
kubectl get all -n hospital-system
```

---

## 🌐 Accessing the Application

### Default Credentials

**Admin User:**
- Username: `admin`
- Password: `Admin@123`
- Email: `admin@hospital.com`

### Endpoints

| Service | Port | URL |
|---------|------|-----|
| Frontend | 80 | http://localhost:8080 (via port-forward) |
| Backend API | 8080 | http://localhost:8090 (via port-forward) |
| MySQL | 3306 | (Internal only) |

### Testing the Application

1. **Access Frontend:**
   ```bash
   kubectl port-forward -n hospital-system svc/frontend-service 8080:80
   ```
   Open: http://localhost:8080

2. **Login as Admin:**
   - Navigate to http://localhost:8080/login
   - Enter credentials above
   - Access admin dashboard

3. **Test Backend API:**
   ```bash
   kubectl port-forward -n hospital-system svc/backend-service 8090:8080
   ```
   Test health: http://localhost:8090/actuator/health

4. **Create Test Users:**
   - Register as Doctor
   - Register as Patient
   - Test appointments, prescriptions, etc.

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Pods Not Starting

```bash
# Check pod status
kubectl get pods -n hospital-system

# Describe pod for errors
kubectl describe pod POD_NAME -n hospital-system

# Check logs
kubectl logs POD_NAME -n hospital-system
```

**Common Fixes:**
- Verify image names in deployment files
- Check secret values
- Ensure sufficient cluster resources

#### 2. MySQL Connection Failed

```bash
# Check MySQL pod
kubectl get pod -l app=mysql -n hospital-system

# Check MySQL logs
kubectl logs -l app=mysql -n hospital-system

# Test MySQL connection
kubectl exec -it POD_NAME -n hospital-system -- mysql -u hospital_user -p
```

**Fixes:**
- Verify MySQL credentials in secrets
- Check SPRING_DATASOURCE_URL in backend config
- Wait for MySQL to be fully ready before backend starts

#### 3. Backend Health Check Failing

```bash
# Check backend logs
kubectl logs -l app=backend -n hospital-system

# Test health endpoint
kubectl exec -it BACKEND_POD -n hospital-system -- wget -O- http://localhost:8080/actuator/health
```

**Fixes:**
- Ensure Actuator is enabled
- Verify database connection
- Check resource limits

#### 4. Frontend Not Loading

```bash
# Check frontend logs
kubectl logs -l app=frontend -n hospital-system

# Test nginx config
kubectl exec -it FRONTEND_POD -n hospital-system -- nginx -t
```

**Fixes:**
- Verify API endpoint in frontend-config
- Check backend service connectivity
- Review nginx.conf

#### 5. Images Not Pulling

```bash
# Check image pull status
kubectl describe pod POD_NAME -n hospital-system | grep -i image

# Verify images exist
docker pull YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest
```

**Fixes:**
- Verify Docker Hub username in deployment files
- Check image visibility (public vs private)
- Add imagePullSecrets if using private registry

### Useful Commands

```bash
# Get all resources
kubectl get all -n hospital-system

# Delete and recreate pod
kubectl delete pod POD_NAME -n hospital-system

# Scale deployment
kubectl scale deployment backend --replicas=3 -n hospital-system

# Update deployment after image change
kubectl rollout restart deployment/backend -n hospital-system
kubectl rollout restart deployment/frontend -n hospital-system

# View events
kubectl get events -n hospital-system --sort-by='.lastTimestamp'

# Execute commands in pod
kubectl exec -it POD_NAME -n hospital-system -- /bin/sh

# Port forward to service
kubectl port-forward -n hospital-system svc/SERVICE_NAME LOCAL_PORT:REMOTE_PORT
```

### Clean Up

```bash
# Delete entire namespace
kubectl delete namespace hospital-system

# Or use Ansible
cd ansible
ansible-playbook undeploy-k8s.yml

# Delete Minikube cluster
minikube delete
```

---

## 📊 Monitoring and Scaling

### View Metrics

```bash
# Pod metrics
kubectl top pods -n hospital-system

# Node metrics
kubectl top nodes

# HPA status
kubectl get hpa -n hospital-system
```

### Manual Scaling

```bash
# Scale backend
kubectl scale deployment backend --replicas=3 -n hospital-system

# Scale frontend
kubectl scale deployment frontend --replicas=3 -n hospital-system
```

### Auto Scaling (HPA)

HPA is configured to scale based on:
- CPU: 70% utilization
- Memory: 80% utilization
- Min replicas: 2
- Max replicas: 5

---

## 🔐 Security Best Practices

1. **Change Default Secrets:**
   ```bash
   # Generate secure JWT secret
   openssl rand -base64 64
   
   # Update k8s/secrets.yaml
   ```

2. **Use TLS/HTTPS:**
   - Configure cert-manager
   - Update ingress.yaml with TLS settings

3. **Network Policies:**
   - Restrict pod-to-pod communication
   - Use namespace isolation

4. **RBAC:**
   - Create service accounts
   - Limit permissions

---

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Ansible Documentation](https://docs.ansible.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🎯 Quick Start Checklist

- [ ] Docker Hub account created
- [ ] Docker Hub repositories created
- [ ] Updated deployment files with Docker Hub username
- [ ] GitHub secrets configured
- [ ] Kubernetes cluster running
- [ ] kubectl configured and working
- [ ] Ansible installed (for automation)
- [ ] Images pushed to Docker Hub
- [ ] Namespace created
- [ ] ConfigMaps and Secrets applied
- [ ] MySQL deployed and running
- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] Application tested with admin login

---

**Need Help?** Check the [Troubleshooting](#troubleshooting) section or review logs with `kubectl logs -f deployment/NAME -n hospital-system`
