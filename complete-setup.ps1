# Complete Automated Setup Script for Hospital Management System Deployment

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Hospital Management System Deployment   " -ForegroundColor Cyan
Write-Host "   Complete Automated Setup                " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify all prerequisites
Write-Host "STEP 1: Verifying Prerequisites" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

# Check WSL2
Write-Host "Checking WSL2..." -ForegroundColor White
$wslList = wsl --list --verbose 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: WSL2 is installed" -ForegroundColor Green
} else {
    Write-Host "ERROR: WSL2 is not installed" -ForegroundColor Red
    Write-Host "Please install WSL2 first" -ForegroundColor Yellow
    exit 1
}

# Check Docker
Write-Host "Checking Docker..." -ForegroundColor White
$dockerVersion = docker --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Docker is installed - $dockerVersion" -ForegroundColor Green
} else {
    Write-Host "ERROR: Docker is not installed or not running" -ForegroundColor Red
    exit 1
}

# Check kubectl
Write-Host "Checking kubectl..." -ForegroundColor White
$kubectlVersion = kubectl version --client 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: kubectl is installed" -ForegroundColor Green
} else {
    Write-Host "ERROR: kubectl is not installed" -ForegroundColor Red
    exit 1
}

# Check Kubernetes cluster
Write-Host "Checking Kubernetes cluster..." -ForegroundColor White
$null = kubectl cluster-info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Kubernetes is not enabled in Docker Desktop!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please enable Kubernetes first:" -ForegroundColor Yellow
    Write-Host "1. Open Docker Desktop" -ForegroundColor White
    Write-Host "2. Go to Settings > Kubernetes" -ForegroundColor White
    Write-Host "3. Check 'Enable Kubernetes'" -ForegroundColor White
    Write-Host "4. Click 'Apply and Restart'" -ForegroundColor White
    Write-Host "5. Wait for Kubernetes to start (5-10 minutes)" -ForegroundColor White
    Write-Host "6. Run this script again" -ForegroundColor White
    Write-Host ""
    $openDocker = Read-Host "Open Docker Desktop now? (Y/N)"
    if ($openDocker -eq "Y" -or $openDocker -eq "y") {
        Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    }
    exit 1
}
Write-Host "SUCCESS: Kubernetes cluster is running" -ForegroundColor Green

# Check Ansible in WSL
Write-Host "Checking Ansible in WSL..." -ForegroundColor White
$ansibleVersion = wsl -d Ubuntu -- ansible --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Ansible is installed in WSL" -ForegroundColor Green
} else {
    Write-Host "ERROR: Ansible is not installed in WSL" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "SUCCESS: All prerequisites are installed!" -ForegroundColor Green
Write-Host ""

# Step 2: Configure Docker Hub username
Write-Host "STEP 2: Configure Docker Hub Username" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
Write-Host ""

$dockerUsername = Read-Host "Enter your Docker Hub username"
if ([string]::IsNullOrWhiteSpace($dockerUsername)) {
    Write-Host "ERROR: Docker Hub username cannot be empty" -ForegroundColor Red
    exit 1
}

Write-Host "Updating configuration files with Docker Hub username: $dockerUsername" -ForegroundColor White
Write-Host ""

# Update k8s/backend-deployment.yaml
$backendDeployment = "k8s/backend-deployment.yaml"
if (Test-Path $backendDeployment) {
    $content = Get-Content $backendDeployment -Raw
    $content = $content -replace "YOUR_DOCKERHUB_USERNAME", $dockerUsername
    Set-Content -Path $backendDeployment -Value $content
    Write-Host "SUCCESS: Updated $backendDeployment" -ForegroundColor Green
} else {
    Write-Host "WARNING: $backendDeployment not found" -ForegroundColor Yellow
}

# Update k8s/frontend-deployment.yaml
$frontendDeployment = "k8s/frontend-deployment.yaml"
if (Test-Path $frontendDeployment) {
    $content = Get-Content $frontendDeployment -Raw
    $content = $content -replace "YOUR_DOCKERHUB_USERNAME", $dockerUsername
    Set-Content -Path $frontendDeployment -Value $content
    Write-Host "SUCCESS: Updated $frontendDeployment" -ForegroundColor Green
} else {
    Write-Host "WARNING: $frontendDeployment not found" -ForegroundColor Yellow
}

# Update ansible/group_vars/all.yml
$ansibleVars = "ansible/group_vars/all.yml"
if (Test-Path $ansibleVars) {
    $content = Get-Content $ansibleVars -Raw
    $content = $content -replace "your-dockerhub-username", $dockerUsername
    Set-Content -Path $ansibleVars -Value $content
    Write-Host "SUCCESS: Updated $ansibleVars" -ForegroundColor Green
} else {
    Write-Host "WARNING: $ansibleVars not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "SUCCESS: Docker Hub username configured!" -ForegroundColor Green
Write-Host ""

# Step 3: Prompt for Docker Hub credentials
Write-Host "STEP 3: Docker Hub Login" -ForegroundColor Yellow
Write-Host "========================" -ForegroundColor Yellow
Write-Host ""

$dockerLogin = Read-Host "Do you want to login to Docker Hub now? (Y/N)"
if ($dockerLogin -eq "Y" -or $dockerLogin -eq "y") {
    Write-Host "Logging in to Docker Hub..." -ForegroundColor White
    docker login
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: Logged in to Docker Hub" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Docker Hub login failed" -ForegroundColor Red
        Write-Host "You can login later using: docker login" -ForegroundColor Yellow
    }
} else {
    Write-Host "Skipped Docker Hub login" -ForegroundColor Yellow
    Write-Host "You can login later using: docker login" -ForegroundColor White
}

Write-Host ""

# Step 4: Choose deployment method
Write-Host "STEP 4: Choose Deployment Method" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose how you want to deploy:" -ForegroundColor White
Write-Host "1. Full automated deployment with Ansible (Recommended)" -ForegroundColor Cyan
Write-Host "2. Manual deployment with kubectl" -ForegroundColor White
Write-Host "3. Skip deployment for now" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1/2/3)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "Starting Ansible automated deployment..." -ForegroundColor Yellow
    Write-Host ""
    
    # Convert Windows path to WSL path
    $currentPath = Get-Location
    $wslPath = $currentPath.Path -replace '\\', '/' -replace 'C:', '/mnt/c'
    $ansiblePath = "$wslPath/ansible"
    
    Write-Host "Running Ansible playbook..." -ForegroundColor White
    Write-Host "This will:" -ForegroundColor Cyan
    Write-Host "- Build Docker images" -ForegroundColor White
    Write-Host "- Push images to Docker Hub" -ForegroundColor White
    Write-Host "- Deploy to Kubernetes" -ForegroundColor White
    Write-Host "- Wait for all pods to be ready" -ForegroundColor White
    Write-Host ""
    Write-Host "This may take 10-15 minutes..." -ForegroundColor Yellow
    Write-Host ""
    
    wsl -d Ubuntu -- bash -c "cd '$ansiblePath' && ansible-playbook main.yml"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCESS: Deployment completed!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Access your application:" -ForegroundColor Cyan
        Write-Host "Run: kubectl port-forward -n hospital-system svc/frontend-service 8080:80" -ForegroundColor White
        Write-Host "Then open: http://localhost:8080" -ForegroundColor White
        Write-Host ""
        Write-Host "Login credentials:" -ForegroundColor Cyan
        Write-Host "Username: admin" -ForegroundColor White
        Write-Host "Password: Admin@123" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "ERROR: Deployment failed" -ForegroundColor Red
        Write-Host "Check the logs above for errors" -ForegroundColor Yellow
    }
    
} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Manual deployment instructions:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Build and push Docker images:" -ForegroundColor Cyan
    Write-Host "   docker build -t ${dockerUsername}/hospital-frontend:latest ./frontend" -ForegroundColor White
    Write-Host "   docker build -t ${dockerUsername}/hospital-backend:latest ./backend" -ForegroundColor White
    Write-Host "   docker push ${dockerUsername}/hospital-frontend:latest" -ForegroundColor White
    Write-Host "   docker push ${dockerUsername}/hospital-backend:latest" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Deploy to Kubernetes:" -ForegroundColor Cyan
    Write-Host "   kubectl apply -f k8s/namespace.yaml" -ForegroundColor White
    Write-Host "   kubectl apply -f k8s/configmaps.yaml" -ForegroundColor White
    Write-Host "   kubectl apply -f k8s/secrets.yaml" -ForegroundColor White
    Write-Host "   kubectl apply -f k8s/mysql-pvc.yaml" -ForegroundColor White
    Write-Host "   kubectl apply -f k8s/mysql-deployment.yaml" -ForegroundColor White
    Write-Host "   kubectl apply -f k8s/backend-deployment.yaml" -ForegroundColor White
    Write-Host "   kubectl apply -f k8s/frontend-deployment.yaml" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host ""
    Write-Host "Deployment skipped" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can deploy later using:" -ForegroundColor Cyan
    Write-Host ".\complete-setup.ps1" -ForegroundColor White
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "           Setup Complete!                  " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor White
Write-Host "- DEPLOYMENT_CHECKLIST.md" -ForegroundColor Cyan
Write-Host "- QUICK_DEPLOY.md" -ForegroundColor Cyan
Write-Host "- DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
