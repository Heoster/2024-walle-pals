# Script to install ImageMagick and convert HEIF images to JPEG
param(
    [string]$SourceFolder = "assets\school\heif_backup",
    [string]$TargetFolder = "assets\school",
    [int]$Quality = 85
)

Write-Host "=== ImageMagick Installation and HEIF Conversion ===" -ForegroundColor Green

# Check if ImageMagick is already installed
$magickPath = Get-Command "magick" -ErrorAction SilentlyContinue
if ($magickPath) {
    Write-Host "✅ ImageMagick is already installed at: $($magickPath.Source)" -ForegroundColor Green
} else {
    Write-Host "ImageMagick not found. Installing..." -ForegroundColor Yellow
    
    # Check if winget is available
    $wingetPath = Get-Command "winget" -ErrorAction SilentlyContinue
    if ($wingetPath) {
        Write-Host "Installing ImageMagick using winget..." -ForegroundColor Cyan
        try {
            winget install --id ImageMagick.ImageMagick --silent --accept-package-agreements --accept-source-agreements
            Write-Host "✅ ImageMagick installed successfully!" -ForegroundColor Green
        } catch {
            Write-Warning "Failed to install ImageMagick via winget: $($_.Exception.Message)"
        }
    } else {
        Write-Host "Winget not available. Please install ImageMagick manually:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://imagemagick.org/script/download.php#windows" -ForegroundColor White
        Write-Host "2. Download the Windows installer" -ForegroundColor White
        Write-Host "3. Run the installer and make sure to check 'Add to PATH'" -ForegroundColor White
        Write-Host "4. Restart PowerShell and run this script again" -ForegroundColor White
        return
    }
}

# Refresh PATH to find newly installed ImageMagick
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")

# Check again for ImageMagick
$magickPath = Get-Command "magick" -ErrorAction SilentlyContinue
if (-not $magickPath) {
    Write-Error "ImageMagick still not found after installation. Please restart PowerShell and try again."
    return
}

Write-Host "Using ImageMagick at: $($magickPath.Source)" -ForegroundColor Green

# Check if backup folder exists
if (-not (Test-Path $SourceFolder)) {
    Write-Error "Backup folder '$SourceFolder' does not exist!"
    return
}

# Get all HEIF files from backup
$heifFiles = Get-ChildItem "$SourceFolder\*.jpg"
Write-Host "Found $($heifFiles.Count) files to convert from backup" -ForegroundColor Cyan

$convertedCount = 0
$errorCount = 0

foreach ($file in $heifFiles) {
    try {
        $targetFile = Join-Path $TargetFolder $file.Name
        Write-Host "Converting: $($file.Name)..." -ForegroundColor Yellow
        
        # Convert HEIF to JPEG using ImageMagick
        $result = & magick $file.FullName -quality $Quality $targetFile 2>&1
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $targetFile)) {
            Write-Host "  ✅ Successfully converted: $($file.Name)" -ForegroundColor Green
            $convertedCount++
        } else {
            Write-Warning "  ❌ Failed to convert: $($file.Name) - $result"
            $errorCount++
        }
    } catch {
        Write-Error "Error converting $($file.Name): $($_.Exception.Message)"
        $errorCount++
    }
}

Write-Host "`n=== Conversion Summary ===" -ForegroundColor Green
Write-Host "Total files processed: $($heifFiles.Count)" -ForegroundColor White
Write-Host "Successfully converted: $convertedCount" -ForegroundColor Green
Write-Host "Errors: $errorCount" -ForegroundColor Red

if ($convertedCount -gt 0) {
    Write-Host "`n✅ Conversion completed! Your images should now display properly." -ForegroundColor Green
}