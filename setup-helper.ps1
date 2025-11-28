# Hospital Management System - Deployment Helper Script
# Run this script in PowerShell

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Hospital Management System - Setup Helper" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# Check prerequisites
Write-Host "Checking Prerequisites..." -ForegroundColor Yellow
Write-Host ""

$hasDocker = Test-CommandExists "docker"
$hasKubectl = Test-CommandExists "kubectl"
$hasPython = Test-CommandExists "python"

Write-Host "Docker:   $(if($hasDocker){'✅ Installed'}else{'❌ Not Found'})"
Write-Host "kubectl:  $(if($hasKubectl){'✅ Installed'}else{'❌ Not Found'})"
Write-Host "Python:   $(if($hasPython){'✅ Installed'}else{'❌ Not Found'})"
Write-Host ""

# Check Docker Hub login
if ($hasDocker) {
    Write-Host "Docker Hub Configuration:" -ForegroundColor Yellow
    $dockerUser = Read-Host "Enter your Docker Hub username"
    
    if ($dockerUser) {
        Write-Host ""
        Write-Host "Updating configuration files with Docker Hub username..." -ForegroundColor Green
        
        # Update k8s files
        $backendDeploy = Get-Content "k8s\backend-deployment.yaml"
        $backendDeploy = $backendDeploy -replace "YOUR_DOCKERHUB_USERNAME", $dockerUser
        $backendDeploy | Set-Content "k8s\backend-deployment.yaml"
        
        $frontendDeploy = Get-Content "k8s\frontend-deployment.yaml"
        $frontendDeploy = $frontendDeploy -replace "YOUR_DOCKERHUB_USERNAME", $dockerUser
        $frontendDeploy | Set-Content "k8s\frontend-deployment.yaml"
        
        # Update ansible vars
        $ansibleVars = Get-Content "ansible\group_vars\all.yml"
        $ansibleVars = $ansibleVars -replace "YOUR_DOCKERHUB_USERNAME", $dockerUser
        $ansibleVars | Set-Content "ansible\group_vars\all.yml"
        
        Write-Host "✅ Configuration files updated!" -ForegroundColor Green
        Write-Host ""
    }
}

# Show deployment options
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Deployment Options:" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Build Docker Images Manually" -ForegroundColor Yellow
Write-Host "   cd frontend"
Write-Host "   docker build -t $dockerUser/hospital-frontend:latest ."
Write-Host "   docker push $dockerUser/hospital-frontend:latest"
Write-Host ""
Write-Host "   cd ..\backend"
Write-Host "   docker build -t $dockerUser/hospital-backend:latest ."
Write-Host "   docker push $dockerUser/hospital-backend:latest"
Write-Host ""

Write-Host "2. Deploy to Kubernetes" -ForegroundColor Yellow
Write-Host "   cd k8s"
Write-Host "   kubectl apply -f namespace.yaml"
Write-Host "   kubectl apply -f configmaps.yaml"
Write-Host "   kubectl apply -f secrets.yaml"
Write-Host "   kubectl apply -f mysql-pvc.yaml"
Write-Host "   kubectl apply -f mysql-deployment.yaml"
Write-Host "   kubectl apply -f backend-deployment.yaml"
Write-Host "   kubectl apply -f frontend-deployment.yaml"
Write-Host ""

Write-Host "3. Check Deployment Status" -ForegroundColor Yellow
Write-Host "   kubectl get all -n hospital-system"
Write-Host "   kubectl get pods -n hospital-system"
Write-Host ""

Write-Host "4. Access Application" -ForegroundColor Yellow
Write-Host "   kubectl port-forward -n hospital-system svc/frontend-service 8080:80"
Write-Host "   Then open: http://localhost:8080"
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

if (-not $hasDocker) {
    Write-Host "⚠️  Install Docker: https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor Red
}

if (-not $hasKubectl) {
    Write-Host "⚠️  Install kubectl: winget install Kubernetes.kubectl" -ForegroundColor Red
}

Write-Host ""
Write-Host "📚 Read the documentation:" -ForegroundColor Green
Write-Host "   - DOCKER_K8S_ANSIBLE_README.md (Overview)"
Write-Host "   - DEPLOYMENT_GUIDE.md (Complete guide)"
Write-Host "   - QUICK_DEPLOY.md (Quick commands)"
Write-Host "   - ANSIBLE_SETUP.md (Ansible installation)"
Write-Host ""

Write-Host "🔑 Default Admin Credentials:" -ForegroundColor Green
Write-Host "   Username: admin"
Write-Host "   Password: Admin@123"
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..."
Write-Host "=========================================" -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
