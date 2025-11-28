# Script to check and enable Kubernetes in Docker Desktop

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Docker Desktop Kubernetes Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker Desktop is running
Write-Host "Checking Docker Desktop status..." -ForegroundColor Yellow
$dockerProcess = Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue

if ($null -eq $dockerProcess) {
    Write-Host "ERROR: Docker Desktop is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Steps:" -ForegroundColor White
    Write-Host "1. Start Docker Desktop from Windows Start Menu" -ForegroundColor White
    Write-Host "2. Wait for Docker Desktop to fully start (whale icon in system tray should be stable)" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    exit 1
}

Write-Host "SUCCESS: Docker Desktop is running" -ForegroundColor Green
Write-Host ""

# Check Docker version
Write-Host "Checking Docker version..." -ForegroundColor Yellow
$dockerVersion = docker --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: $dockerVersion" -ForegroundColor Green
} else {
    Write-Host "ERROR: Cannot access Docker CLI" -ForegroundColor Red
    Write-Host "Please ensure Docker Desktop is fully started." -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Check Kubernetes status
Write-Host "Checking Kubernetes status..." -ForegroundColor Yellow
$kubectlInstalled = $false
$kubectlVersion = kubectl version --client 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: kubectl is installed" -ForegroundColor Green
    $kubectlInstalled = $true
} else {
    Write-Host "WARNING: kubectl is not installed" -ForegroundColor Yellow
}

if ($kubectlInstalled) {
    $null = kubectl cluster-info 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS: Kubernetes is enabled and running!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Cluster Info:" -ForegroundColor Cyan
        kubectl cluster-info
        Write-Host ""
        Write-Host "SUCCESS: All prerequisites are ready!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next Steps:" -ForegroundColor Cyan
        Write-Host "1. Update Docker Hub username: .\setup-helper.ps1" -ForegroundColor White
        Write-Host "2. Deploy the application using Ansible" -ForegroundColor White
        exit 0
    }
}

Write-Host "WARNING: Kubernetes is NOT enabled in Docker Desktop" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "How to Enable Kubernetes in Docker Desktop" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Follow these steps:" -ForegroundColor White
Write-Host ""
Write-Host "1. Open Docker Desktop" -ForegroundColor Yellow
Write-Host "   - Click on the Docker whale icon in your system tray" -ForegroundColor White
Write-Host ""
Write-Host "2. Go to Settings" -ForegroundColor Yellow
Write-Host "   - Click the gear icon at the top-right" -ForegroundColor White
Write-Host ""
Write-Host "3. Enable Kubernetes" -ForegroundColor Yellow
Write-Host "   - Click on Kubernetes in the left sidebar" -ForegroundColor White
Write-Host "   - Check the box that says Enable Kubernetes" -ForegroundColor White
Write-Host "   - Click Apply and Restart button" -ForegroundColor White
Write-Host ""
Write-Host "4. Wait for Kubernetes to start" -ForegroundColor Yellow
Write-Host "   - Docker Desktop will download Kubernetes components" -ForegroundColor White
Write-Host "   - This may take 5-10 minutes" -ForegroundColor White
Write-Host "   - Wait until it shows Kubernetes is running" -ForegroundColor White
Write-Host ""
Write-Host "5. Verify Installation" -ForegroundColor Yellow
Write-Host "   - Run this script again: .\enable-kubernetes.ps1" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open Docker Desktop settings
$response = Read-Host "Do you want to open Docker Desktop now? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Write-Host "Opening Docker Desktop..." -ForegroundColor Yellow
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    Write-Host ""
    Write-Host "Remember to:" -ForegroundColor Cyan
    Write-Host "1. Click Settings" -ForegroundColor White
    Write-Host "2. Go to Kubernetes" -ForegroundColor White
    Write-Host "3. Enable Kubernetes" -ForegroundColor White
    Write-Host "4. Click Apply and Restart" -ForegroundColor White
    Write-Host "5. Wait for it to complete" -ForegroundColor White
    Write-Host "6. Run this script again" -ForegroundColor White
}

Write-Host ""
Write-Host "After enabling Kubernetes, run: .\enable-kubernetes.ps1" -ForegroundColor Cyan
Write-Host ""
