# Hospital Management System - Kubernetes Deployment Script
# This script builds Docker images and deploys to Kubernetes

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Hospital Management System - K8s Deploy" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Configuration
$DOCKER_USERNAME = "hospitalapp"  # Change this to your Docker Hub username
$BACKEND_IMAGE = "${DOCKER_USERNAME}/hospital-backend"
$FRONTEND_IMAGE = "${DOCKER_USERNAME}/hospital-frontend"
$VERSION = "latest"

# Step 1: Check if Kubernetes is running
Write-Host "[1/8] Checking Kubernetes status..." -ForegroundColor Yellow
$k8sRunning = kubectl cluster-info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Kubernetes is not running. Please start Kubernetes in Docker Desktop." -ForegroundColor Red
    Write-Host "   Go to Docker Desktop -> Settings -> Kubernetes -> Enable Kubernetes" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Kubernetes is running" -ForegroundColor Green

# Step 2: Build Backend Docker Image
Write-Host "`n[2/8] Building Backend Docker image..." -ForegroundColor Yellow
Set-Location backend
docker build -t ${BACKEND_IMAGE}:${VERSION} .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend image build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend image built successfully" -ForegroundColor Green
Set-Location ..

# Step 3: Build Frontend Docker Image
Write-Host "`n[3/8] Building Frontend Docker image..." -ForegroundColor Yellow
Set-Location frontend
docker build -t ${FRONTEND_IMAGE}:${VERSION} .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend image build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend image built successfully" -ForegroundColor Green
Set-Location ..

# Step 4: Update K8s deployment files with image names
Write-Host "`n[4/8] Updating Kubernetes deployment files..." -ForegroundColor Yellow
(Get-Content k8s/backend-deployment.yaml) -replace 'YOUR_DOCKERHUB_USERNAME/hospital-backend:latest', "${BACKEND_IMAGE}:${VERSION}" | Set-Content k8s/backend-deployment.yaml
(Get-Content k8s/frontend-deployment.yaml) -replace 'YOUR_DOCKERHUB_USERNAME/hospital-frontend:latest', "${FRONTEND_IMAGE}:${VERSION}" | Set-Content k8s/frontend-deployment.yaml
(Get-Content k8s/backend-deployment.yaml) -replace 'imagePullPolicy: Always', 'imagePullPolicy: IfNotPresent' | Set-Content k8s/backend-deployment.yaml
(Get-Content k8s/frontend-deployment.yaml) -replace 'imagePullPolicy: Always', 'imagePullPolicy: IfNotPresent' | Set-Content k8s/frontend-deployment.yaml
Write-Host "✅ Deployment files updated" -ForegroundColor Green

# Step 5: Create namespace
Write-Host "`n[5/8] Creating Kubernetes namespace..." -ForegroundColor Yellow
kubectl apply -f k8s/namespace.yaml
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create namespace" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Namespace created" -ForegroundColor Green

# Step 6: Apply ConfigMaps and Secrets
Write-Host "`n[6/8] Applying ConfigMaps and Secrets..." -ForegroundColor Yellow
kubectl apply -f k8s/configmaps.yaml
kubectl apply -f k8s/secrets.yaml
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to apply configs" -ForegroundColor Red
    exit 1
}
Write-Host "✅ ConfigMaps and Secrets applied" -ForegroundColor Green

# Step 7: Deploy MySQL (with PVC)
Write-Host "`n[7/8] Deploying MySQL database..." -ForegroundColor Yellow
kubectl apply -f k8s/mysql-pvc.yaml
kubectl apply -f k8s/mysql-deployment.yaml
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to deploy MySQL" -ForegroundColor Red
    exit 1
}
Write-Host "✅ MySQL deployment started" -ForegroundColor Green

# Wait for MySQL to be ready
Write-Host "   Waiting for MySQL to be ready..." -ForegroundColor Yellow
$maxWait = 120
$waited = 0
while ($waited -lt $maxWait) {
    $mysqlStatus = kubectl get pods -n hospital-system -l app=mysql -o jsonpath='{.items[0].status.phase}' 2>$null
    if ($mysqlStatus -eq "Running") {
        Start-Sleep -Seconds 10  # Give MySQL extra time to initialize
        Write-Host "   ✅ MySQL is ready" -ForegroundColor Green
        break
    }
    Start-Sleep -Seconds 5
    $waited += 5
    Write-Host "   ..." -NoNewline
}
if ($waited -ge $maxWait) {
    Write-Host "`n   ⚠️  MySQL startup timeout. Continuing anyway..." -ForegroundColor Yellow
}

# Step 8: Deploy Backend and Frontend
Write-Host "`n[8/8] Deploying Backend and Frontend..." -ForegroundColor Yellow
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to deploy services" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend and Frontend deployments started" -ForegroundColor Green

# Display deployment status
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Deployment Status" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Checking pod status..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
kubectl get pods -n hospital-system

Write-Host "`n" -NoNewline
Write-Host "Checking services..." -ForegroundColor Yellow
kubectl get services -n hospital-system

# Wait for frontend LoadBalancer to get external IP
Write-Host "`n" -NoNewline
Write-Host "Waiting for frontend service to get external IP..." -ForegroundColor Yellow
$maxWait = 60
$waited = 0
while ($waited -lt $maxWait) {
    $frontendIP = kubectl get service frontend-service -n hospital-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>$null
    if (-not [string]::IsNullOrWhiteSpace($frontendIP)) {
        Write-Host "✅ Frontend service is available at: http://${frontendIP}" -ForegroundColor Green
        break
    }
    $frontendHost = kubectl get service frontend-service -n hospital-system -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>$null
    if (-not [string]::IsNullOrWhiteSpace($frontendHost)) {
        Write-Host "✅ Frontend service is available at: http://${frontendHost}" -ForegroundColor Green
        break
    }
    Start-Sleep -Seconds 3
    $waited += 3
}

if ($waited -ge $maxWait) {
    Write-Host "⚠️  LoadBalancer external IP not available yet." -ForegroundColor Yellow
    Write-Host "   For Docker Desktop Kubernetes, use: kubectl port-forward" -ForegroundColor Yellow
    Write-Host "   Run: kubectl port-forward -n hospital-system service/frontend-service 8080:80" -ForegroundColor Cyan
    Write-Host "   Then access: http://localhost:8080" -ForegroundColor Cyan
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Useful Commands" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "View pods:           kubectl get pods -n hospital-system" -ForegroundColor White
Write-Host "View services:       kubectl get services -n hospital-system" -ForegroundColor White
Write-Host "View logs (backend): kubectl logs -n hospital-system -l app=backend -f" -ForegroundColor White
Write-Host "View logs (frontend):kubectl logs -n hospital-system -l app=frontend -f" -ForegroundColor White
Write-Host "Port forward:        kubectl port-forward -n hospital-system service/frontend-service 8080:80" -ForegroundColor White
Write-Host "Delete deployment:   kubectl delete namespace hospital-system" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "   Note: It may take a few minutes for all pods to be ready." -ForegroundColor Yellow
