# 🎯 Deployment Checklist

Use this checklist to ensure a smooth deployment of the Hospital Management System.

## Pre-Deployment

### ✅ Prerequisites
- [ ] Docker installed and running (`docker --version`)
- [ ] kubectl installed (`kubectl version --client`)
- [ ] Kubernetes cluster running (`kubectl cluster-info`)
- [ ] Ansible installed (if using automation) (`ansible --version`)
- [ ] Docker Hub account created
- [ ] GitHub account (if using CI/CD)

### ✅ Accounts & Configuration
- [ ] Docker Hub username noted: `_________________`
- [ ] Docker Hub repositories created:
  - [ ] `your-username/hospital-frontend`
  - [ ] `your-username/hospital-backend`
- [ ] GitHub Secrets configured (if using CI/CD):
  - [ ] `DOCKER_USERNAME`
  - [ ] `DOCKER_PASSWORD`

### ✅ Configuration Files Updated
- [ ] `k8s/backend-deployment.yaml` (line 36) - Docker Hub username
- [ ] `k8s/frontend-deployment.yaml` (line 25) - Docker Hub username
- [ ] `ansible/group_vars/all.yml` (line 3-4) - Docker Hub credentials

---

## Deployment Steps

### Option 1: Using Ansible (Recommended)

#### Step 1: Build and Push Images
```bash
cd ansible
ansible-playbook build-push-images.yml
```
- [ ] Frontend image built successfully
- [ ] Backend image built successfully
- [ ] Images pushed to Docker Hub
- [ ] Verified images on Docker Hub

#### Step 2: Deploy to Kubernetes
```bash
ansible-playbook deploy-k8s.yml
```
- [ ] Namespace created
- [ ] ConfigMaps applied
- [ ] Secrets applied
- [ ] MySQL deployed and running
- [ ] Backend deployed and running
- [ ] Frontend deployed and running

#### Step 3: Verify Deployment
```bash
kubectl get all -n hospital-system
```
- [ ] All pods in Running state
- [ ] All services created
- [ ] No errors in pod descriptions

---

### Option 2: Using GitHub Actions + kubectl

#### Step 1: Trigger GitHub Actions
- [ ] Code pushed to GitHub
- [ ] GitHub Actions workflow triggered
- [ ] Frontend build completed
- [ ] Backend build completed
- [ ] Images available on Docker Hub

#### Step 2: Deploy with kubectl
```bash
cd k8s
kubectl apply -f namespace.yaml
kubectl apply -f configmaps.yaml
kubectl apply -f secrets.yaml
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deployment.yaml
# Wait for MySQL
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```
- [ ] Each resource created successfully
- [ ] MySQL pod ready (may take 2-3 minutes)
- [ ] Backend pods ready (may take 1-2 minutes)
- [ ] Frontend pods ready

---

## Post-Deployment Verification

### ✅ Resource Status
```bash
kubectl get all -n hospital-system
```
- [ ] All pods show STATUS: Running
- [ ] All services are created
- [ ] Deployments show READY: 2/2

### ✅ Pod Health
```bash
kubectl get pods -n hospital-system
```
- [ ] mysql-xxx - Running (1/1)
- [ ] backend-xxx - Running (1/1) - 2 replicas
- [ ] frontend-xxx - Running (1/1) - 2 replicas

### ✅ Service Access
```bash
kubectl get svc -n hospital-system
```
- [ ] mysql-service - ClusterIP
- [ ] backend-service - ClusterIP
- [ ] frontend-service - LoadBalancer or ClusterIP

### ✅ Logs Check
```bash
kubectl logs -f deployment/backend -n hospital-system
kubectl logs -f deployment/frontend -n hospital-system
```
- [ ] Backend logs show Spring Boot started successfully
- [ ] Backend logs show "Started HospitalManagementApplication"
- [ ] No error messages in logs
- [ ] Default admin user created message visible

### ✅ Health Checks
```bash
kubectl port-forward -n hospital-system svc/backend-service 8090:8080
curl http://localhost:8090/actuator/health
```
- [ ] Health endpoint returns `{"status":"UP"}`
- [ ] Database connection UP

---

## Application Testing

### ✅ Access Frontend
```bash
kubectl port-forward -n hospital-system svc/frontend-service 8080:80
```
- [ ] Port-forward established
- [ ] Browser opens http://localhost:8080
- [ ] Frontend loads without errors
- [ ] Login page visible

### ✅ Admin Login
- [ ] Navigate to http://localhost:8080/login
- [ ] Enter username: `admin`
- [ ] Enter password: `Admin@123`
- [ ] Successfully logged in
- [ ] Redirected to admin dashboard

### ✅ Dashboard Verification
- [ ] Dashboard displays statistics
- [ ] Total Users count visible
- [ ] Total Doctors count visible
- [ ] Total Patients count visible

### ✅ Admin Operations
- [ ] Navigate to "Manage Doctors"
- [ ] Can view doctor list (may be empty)
- [ ] Navigate to "Manage Patients"
- [ ] Can view patient list (may be empty)

### ✅ User Registration
- [ ] Logout from admin
- [ ] Register new doctor account
- [ ] Doctor registration successful
- [ ] Login with doctor credentials
- [ ] Doctor dashboard accessible

### ✅ Patient Operations
- [ ] Register new patient account
- [ ] Login with patient credentials
- [ ] Patient dashboard accessible
- [ ] Can view "Find Doctors"
- [ ] Can access "Book Appointment"

### ✅ Backend API
- [ ] Test health: http://localhost:8090/actuator/health
- [ ] API responds with JSON
- [ ] No 5xx errors

---

## Monitoring & Maintenance

### ✅ Resource Usage
```bash
kubectl top pods -n hospital-system
kubectl top nodes
```
- [ ] Pods within resource limits
- [ ] No OOMKilled pods
- [ ] CPU usage reasonable (<70%)
- [ ] Memory usage reasonable (<80%)

### ✅ Auto-Scaling
```bash
kubectl get hpa -n hospital-system
```
- [ ] HPA for backend configured
- [ ] HPA for frontend configured
- [ ] Current metrics visible

### ✅ Persistent Storage
```bash
kubectl get pvc -n hospital-system
```
- [ ] mysql-pvc bound
- [ ] Storage size correct (10Gi)

---

## Common Issues Resolution

### Issue: Pods in ImagePullBackOff
- [ ] Verify Docker Hub username in deployment files
- [ ] Check image exists: `docker pull your-username/hospital-frontend:latest`
- [ ] Ensure images are public or add imagePullSecrets

### Issue: MySQL Pod CrashLoopBackOff
- [ ] Check PVC status: `kubectl get pvc -n hospital-system`
- [ ] Review MySQL logs: `kubectl logs -l app=mysql -n hospital-system`
- [ ] Verify secrets: `kubectl get secret mysql-secret -n hospital-system -o yaml`

### Issue: Backend Not Connecting to Database
- [ ] Verify MySQL is running: `kubectl get pod -l app=mysql -n hospital-system`
- [ ] Check backend logs: `kubectl logs -l app=backend -n hospital-system`
- [ ] Verify SPRING_DATASOURCE_URL in configmap
- [ ] Check database credentials in secrets

### Issue: Frontend Shows Blank Page
- [ ] Check browser console for errors (F12)
- [ ] Verify backend is accessible
- [ ] Check REACT_APP_API_BASE_URL in frontend configmap
- [ ] Review Nginx logs: `kubectl logs -l app=frontend -n hospital-system`

---

## Cleanup (When Done)

### ✅ Remove Deployment
```bash
cd ansible
ansible-playbook undeploy-k8s.yml
```
OR
```bash
kubectl delete namespace hospital-system
```
- [ ] All resources deleted
- [ ] Namespace removed
- [ ] PVC deleted

### ✅ Stop Cluster (if using Minikube)
```bash
minikube stop
minikube delete
```
- [ ] Cluster stopped
- [ ] Resources freed

---

## Success Criteria ✨

Your deployment is successful when:

- [x] All pods are Running
- [x] Services are accessible
- [x] Frontend loads in browser
- [x] Admin can login successfully
- [x] Dashboard displays statistics
- [x] New users can register
- [x] No error messages in logs
- [x] Health checks pass
- [x] Database persists data

---

## Documentation Reference

For detailed information, refer to:

- **[DOCKER_K8S_ANSIBLE_README.md](DOCKER_K8S_ANSIBLE_README.md)** - Overview
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete guide
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Quick reference
- **[ANSIBLE_SETUP.md](ANSIBLE_SETUP.md)** - Ansible installation
- **[ADMIN_FEATURES_SUMMARY.md](ADMIN_FEATURES_SUMMARY.md)** - Application features

---

## Notes

**Deployment Date:** `_______________`

**Deployed By:** `_______________`

**Cluster Type:** `_______________` (Minikube / Docker Desktop / Cloud)

**Docker Hub Username:** `_______________`

**Issues Encountered:** 
```
_________________________________________________
_________________________________________________
_________________________________________________
```

**Resolution:**
```
_________________________________________________
_________________________________________________
_________________________________________________
```

---

**Deployment Status:** [ ] ✅ Successful  [ ] ⚠️ Partial  [ ] ❌ Failed

**Next Review Date:** `_______________`
