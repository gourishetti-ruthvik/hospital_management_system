# Quick Deployment Commands

Quick reference for deploying Hospital Management System.

## 🚀 Quick Start (3 Steps)

### Step 1: Build and Push Images (Choose One)

**Option A: Using GitHub Actions (Recommended)**
```bash
# Push code to GitHub
git add .
git commit -m "Deploy hospital management system"
git push origin main
# Images will be built automatically
```

**Option B: Using Ansible**
```bash
cd ansible
ansible-playbook build-push-images.yml
```

**Option C: Manual Docker Build**
```bash
# Login to Docker Hub
docker login

# Build and push frontend
cd frontend
docker build -t YOUR_USERNAME/hospital-frontend:latest .
docker push YOUR_USERNAME/hospital-frontend:latest

# Build and push backend
cd ../backend
docker build -t YOUR_USERNAME/hospital-backend:latest .
docker push YOUR_USERNAME/hospital-backend:latest
```

### Step 2: Start Kubernetes Cluster

```bash
# Minikube
minikube start --cpus=4 --memory=8192
minikube addons enable metrics-server

# OR Docker Desktop
# Enable Kubernetes in Settings
```

### Step 3: Deploy Application (Choose One)

**Option A: Using Ansible (Recommended)**
```bash
cd ansible
ansible-playbook deploy-k8s.yml
```

**Option B: Using kubectl**
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
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```

---

## 📋 Essential Commands

### Check Status
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

### Access Application
```bash
# Frontend
kubectl port-forward -n hospital-system svc/frontend-service 8080:80
# Open: http://localhost:8080

# Backend API
kubectl port-forward -n hospital-system svc/backend-service 8090:8080
# Open: http://localhost:8090/actuator/health

# Minikube direct access
minikube service frontend-service -n hospital-system
```

### Update Deployment
```bash
# After pushing new images
kubectl rollout restart deployment/backend -n hospital-system
kubectl rollout restart deployment/frontend -n hospital-system
```

### Scale Application
```bash
# Manual scaling
kubectl scale deployment backend --replicas=3 -n hospital-system
kubectl scale deployment frontend --replicas=3 -n hospital-system

# Check HPA
kubectl get hpa -n hospital-system
```

### Troubleshooting
```bash
# Describe pod
kubectl describe pod POD_NAME -n hospital-system

# Get events
kubectl get events -n hospital-system --sort-by='.lastTimestamp'

# Execute in pod
kubectl exec -it POD_NAME -n hospital-system -- /bin/sh

# Check resources
kubectl top pods -n hospital-system
kubectl top nodes
```

### Clean Up
```bash
# Using Ansible
cd ansible
ansible-playbook undeploy-k8s.yml

# Using kubectl
kubectl delete namespace hospital-system

# Delete Minikube
minikube delete
```

---

## 🔑 Default Credentials

**Admin User:**
- Username: `admin`
- Password: `Admin@123`

---

## 📝 Configuration Files to Update

Before deployment, update these files with your Docker Hub username:

1. `k8s/backend-deployment.yaml` - Line 36
2. `k8s/frontend-deployment.yaml` - Line 25
3. `ansible/group_vars/all.yml` - Line 3

**Find and replace:**
```bash
# Linux/Mac
find k8s ansible -type f -name "*.yaml" -o -name "*.yml" | xargs sed -i 's/YOUR_DOCKERHUB_USERNAME/actual_username/g'

# Windows (PowerShell)
Get-ChildItem -Path k8s,ansible -Include *.yaml,*.yml -Recurse | ForEach-Object { 
    (Get-Content $_).Replace('YOUR_DOCKERHUB_USERNAME', 'actual_username') | Set-Content $_
}
```

---

## 🎯 Complete Pipeline (One Command)

```bash
cd ansible
ansible-playbook main.yml
```

This will:
1. ✅ Build Docker images
2. ✅ Push to Docker Hub
3. ✅ Deploy to Kubernetes
4. ✅ Verify deployment
5. ✅ Display access information

---

## 📱 Quick Test

```bash
# 1. Port forward frontend
kubectl port-forward -n hospital-system svc/frontend-service 8080:80 &

# 2. Test frontend
curl http://localhost:8080

# 3. Port forward backend
kubectl port-forward -n hospital-system svc/backend-service 8090:8080 &

# 4. Test backend health
curl http://localhost:8090/actuator/health

# 5. Login to application
open http://localhost:8080/login
# Username: admin
# Password: Admin@123
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Automatic)

**Triggers:**
- Push to `main` branch
- Pull request to `main`
- Manual workflow dispatch

**What it does:**
1. Builds frontend image → Pushes to Docker Hub
2. Builds backend image → Pushes to Docker Hub
3. Runs security scans
4. Tags images with commit SHA

**Setup GitHub Secrets:**
```
Settings → Secrets → Actions → New repository secret

DOCKER_USERNAME: your_dockerhub_username
DOCKER_PASSWORD: your_dockerhub_password
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: Pods in ImagePullBackOff
```bash
# Fix: Update image name in deployment
kubectl edit deployment backend -n hospital-system
# Change image to: YOUR_USERNAME/hospital-backend:latest
```

### Issue: Backend CrashLoopBackOff
```bash
# Check logs
kubectl logs -l app=backend -n hospital-system

# Usually MySQL not ready, wait and restart
kubectl delete pod -l app=backend -n hospital-system
```

### Issue: Frontend shows blank page
```bash
# Check backend connectivity
kubectl logs -l app=frontend -n hospital-system

# Verify API endpoint in configmap
kubectl get configmap frontend-config -n hospital-system -o yaml
```

### Issue: No external IP for LoadBalancer
```bash
# Use port-forward instead
kubectl port-forward -n hospital-system svc/frontend-service 8080:80

# Or use NodePort
kubectl patch svc frontend-service -n hospital-system -p '{"spec":{"type":"NodePort"}}'
```

---

## 📊 Monitoring

```bash
# Watch pods
kubectl get pods -n hospital-system -w

# Watch services
kubectl get svc -n hospital-system -w

# Stream logs
kubectl logs -f -l app=backend -n hospital-system

# Metrics
kubectl top pods -n hospital-system
```

---

**For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**
