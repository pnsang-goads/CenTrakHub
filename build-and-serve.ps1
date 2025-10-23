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

Write-Host "Building React app and copying to Laravel public/app..." -ForegroundColor Cyan
Push-Location $FrontendDir
if (Test-Path yarn.lock) {
  yarn install
  yarn build:php
} else {
  npm install
  npm run build:php
}
Pop-Location

Write-Host "Starting Laravel server..." -ForegroundColor Cyan
Push-Location $LaravelDir
php artisan serve
Pop-Location
