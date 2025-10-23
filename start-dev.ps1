param(
  [string]$LaravelDir = "centrak-hub",
  [string]$FrontendDir = "centrak-hub-ui/centrak-hub-ui-base"
)

# Fallback if renamed folder not present
if (-not (Test-Path $LaravelDir) -and (Test-Path "GPS-Tracker")) { $LaravelDir = "GPS-Tracker" }
if (-not (Test-Path $FrontendDir)) {
  if (Test-Path "centrak-hub-ui/simple-react-srcipts_TS") { $FrontendDir = "centrak-hub-ui/simple-react-srcipts_TS" }
  elseif (Test-Path "front_end/simple-react-srcipts_TS") { $FrontendDir = "front_end/simple-react-srcipts_TS" }
}

Write-Host "Starting Laravel dev server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoProfile","-Command","cd `"$LaravelDir`"; php artisan serve" -WindowStyle Hidden

Start-Sleep -Seconds 2

Write-Host "Starting React dev server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoProfile","-Command","cd `"$FrontendDir`"; if (Test-Path yarn.lock) { yarn start } else { npm start }"

Write-Host "Dev servers launched. API: http://localhost:8000, React: http://localhost:3000" -ForegroundColor Green
