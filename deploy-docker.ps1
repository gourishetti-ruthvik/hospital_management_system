# Docker Deployment Script for Hospital Management System

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Hospital Management System              " -ForegroundColor Cyan
Write-Host "   Docker Deployment                       " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker..." -ForegroundColor Yellow
$dockerVersion = docker --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop first." -ForegroundColor Yellow
    exit 1
}
Write-Host "SUCCESS: Docker is running - $dockerVersion" -ForegroundColor Green
Write-Host ""

# Stop any existing containers
Write-Host "Cleaning up any existing containers..." -ForegroundColor Yellow
docker-compose down -v 2>$null
Write-Host "SUCCESS: Cleanup complete" -ForegroundColor Green
Write-Host ""

# Build and start containers
Write-Host "Building and starting containers..." -ForegroundColor Yellow
Write-Host "This will take 5-10 minutes on first run..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Progress:" -ForegroundColor White
Write-Host "- Building frontend image (React + Nginx)..." -ForegroundColor White
Write-Host "- Building backend image (Spring Boot)..." -ForegroundColor White
Write-Host "- Pulling MySQL 8.0 image..." -ForegroundColor White
Write-Host "- Starting all services..." -ForegroundColor White
Write-Host ""

docker-compose up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Failed to build and start containers" -ForegroundColor Red
    Write-Host "Check the error messages above" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "SUCCESS: Containers are starting..." -ForegroundColor Green
Write-Host ""

# Wait for services to be healthy
Write-Host "Waiting for services to be ready..." -ForegroundColor Yellow
Write-Host "This may take 1-2 minutes..." -ForegroundColor Cyan
Write-Host ""

$maxWait = 120
$elapsed = 0
$allHealthy = $false

while ($elapsed -lt $maxWait) {
    Start-Sleep -Seconds 5
    $elapsed += 5
    
    # Check container status
    $mysqlHealth = docker inspect --format='{{.State.Health.Status}}' hospital-mysql 2>$null
    $backendHealth = docker inspect --format='{{.State.Health.Status}}' hospital-backend 2>$null
    $frontendHealth = docker inspect --format='{{.State.Health.Status}}' hospital-frontend 2>$null
    
    Write-Host "[$elapsed/$maxWait seconds] MySQL: $mysqlHealth | Backend: $backendHealth | Frontend: $frontendHealth" -ForegroundColor Cyan
    
    if ($mysqlHealth -eq "healthy" -and $backendHealth -eq "healthy" -and $frontendHealth -eq "healthy") {
        $allHealthy = $true
        break
    }
}

Write-Host ""

if ($allHealthy) {
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "   DEPLOYMENT SUCCESSFUL!                  " -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your application is now running!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Access the application:" -ForegroundColor Yellow
    Write-Host "  Frontend: http://localhost" -ForegroundColor White
    Write-Host "  Backend API: http://localhost:8080" -ForegroundColor White
    Write-Host "  MySQL: localhost:3306" -ForegroundColor White
    Write-Host ""
    Write-Host "Login Credentials:" -ForegroundColor Yellow
    Write-Host "  Username: admin" -ForegroundColor White
    Write-Host "  Password: Admin@123" -ForegroundColor White
    Write-Host ""
    Write-Host "Useful Commands:" -ForegroundColor Yellow
    Write-Host "  View logs: docker-compose logs -f" -ForegroundColor White
    Write-Host "  Stop all: docker-compose down" -ForegroundColor White
    Write-Host "  Restart: docker-compose restart" -ForegroundColor White
    Write-Host "  View status: docker-compose ps" -ForegroundColor White
    Write-Host ""
    Write-Host "Opening application in browser..." -ForegroundColor Cyan
    Start-Sleep -Seconds 2
    Start-Process "http://localhost"
    
} else {
    Write-Host "WARNING: Services are taking longer than expected to start" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Current container status:" -ForegroundColor Cyan
    docker-compose ps
    Write-Host ""
    Write-Host "Check logs for more details:" -ForegroundColor Yellow
    Write-Host "  Backend logs: docker-compose logs backend" -ForegroundColor White
    Write-Host "  Frontend logs: docker-compose logs frontend" -ForegroundColor White
    Write-Host "  MySQL logs: docker-compose logs mysql" -ForegroundColor White
    Write-Host ""
    Write-Host "The application should be accessible at:" -ForegroundColor Cyan
    Write-Host "  http://localhost" -ForegroundColor White
}

Write-Host ""
