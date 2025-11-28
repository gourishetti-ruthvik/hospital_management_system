# Docker Deployment Status and Management Script

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Hospital Management System              " -ForegroundColor Cyan
Write-Host "   Docker Status & Management              " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check Docker status
Write-Host "Container Status:" -ForegroundColor Yellow
Write-Host ""
docker-compose ps

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   DEPLOYMENT SUCCESSFUL!                  " -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Application URLs:" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost" -ForegroundColor White
Write-Host "  Backend:   http://localhost:8080" -ForegroundColor White
Write-Host "  MySQL:     localhost:3307" -ForegroundColor White
Write-Host ""

Write-Host "Login Credentials:" -ForegroundColor Cyan
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: Admin@123" -ForegroundColor White
Write-Host ""

Write-Host "Useful Commands:" -ForegroundColor Yellow
Write-Host "  View all logs:        docker-compose logs -f" -ForegroundColor White
Write-Host "  View backend logs:    docker-compose logs -f backend" -ForegroundColor White
Write-Host "  View frontend logs:   docker-compose logs -f frontend" -ForegroundColor White
Write-Host "  View MySQL logs:      docker-compose logs -f mysql" -ForegroundColor White
Write-Host ""
Write-Host "  Restart all:          docker-compose restart" -ForegroundColor White
Write-Host "  Restart backend:      docker-compose restart backend" -ForegroundColor White
Write-Host "  Restart frontend:     docker-compose restart frontend" -ForegroundColor White
Write-Host ""
Write-Host "  Stop all:             docker-compose stop" -ForegroundColor White
Write-Host "  Start all:            docker-compose start" -ForegroundColor White
Write-Host ""
Write-Host "  Remove all:           docker-compose down" -ForegroundColor Red
Write-Host "  Remove with volumes:  docker-compose down -v" -ForegroundColor Red
Write-Host ""

$openBrowser = Read-Host "Do you want to open the application in browser? (Y/N)"
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Write-Host "Opening application..." -ForegroundColor Cyan
    Start-Process "http://localhost"
}

Write-Host ""
Write-Host "Deployment complete! Enjoy your application!" -ForegroundColor Green
Write-Host ""
