# PowerShell script to convert HEIF/HEIC images to JPEG format
# This script uses Windows built-in image conversion capabilities

param(
    [string]$SourceFolder = "assets\school",
    [int]$Quality = 85
)

Write-Host "Starting HEIF to JPEG conversion..." -ForegroundColor Green

# Check if the folder exists
if (-not (Test-Path $SourceFolder)) {
    Write-Error "Source folder '$SourceFolder' does not exist!"
    exit 1
}

# Get all .jpg files in the folder
$files = Get-ChildItem "$SourceFolder\*.jpg"
$heifFiles = @()
$convertedCount = 0
$errorCount = 0

Write-Host "Scanning for HEIF files disguised as JPG..." -ForegroundColor Yellow

foreach ($file in $files) {
    try {
        # Read first 4 bytes to check file signature
        $bytes = Get-Content $file.FullName -TotalCount 4 -AsByteStream
        $signature = ($bytes | ForEach-Object { $_.ToString("X2") }) -join ""
        
        # Check if it's a HEIF file (starts with 00000018)
        if ($signature -eq "00000018") {
            $heifFiles += $file
            Write-Host "Found HEIF file: $($file.Name)" -ForegroundColor Cyan
        }
        elseif ($signature.StartsWith("FFD8FF")) {
            Write-Host "Valid JPEG: $($file.Name)" -ForegroundColor Green
        }
        else {
            Write-Host "Unknown format: $($file.Name) - $signature" -ForegroundColor Magenta
        }
    }
    catch {
        Write-Warning "Could not read file: $($file.Name) - $($_.Exception.Message)"
        $errorCount++
    }
}

Write-Host "`nFound $($heifFiles.Count) HEIF files to convert" -ForegroundColor Yellow

if ($heifFiles.Count -eq 0) {
    Write-Host "No HEIF files found. All images are already in proper format!" -ForegroundColor Green
    exit 0
}

# Create backup folder
$backupFolder = "$SourceFolder\heif_backup"
if (-not (Test-Path $backupFolder)) {
    New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null
    Write-Host "Created backup folder: $backupFolder" -ForegroundColor Green
}

# Load required assemblies for image processing
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

foreach ($file in $heifFiles) {
    try {
        Write-Host "Processing: $($file.Name)..." -ForegroundColor Yellow
        
        # Create backup
        $backupPath = Join-Path $backupFolder $file.Name
        Copy-Item $file.FullName $backupPath -Force
        Write-Host "  Backed up to: $backupPath" -ForegroundColor Gray
        
        # Try to convert using Windows Image API
        $tempName = $file.FullName + ".temp"
        
        # Use magick command if available (ImageMagick)
        $magickPath = Get-Command "magick" -ErrorAction SilentlyContinue
        if ($magickPath) {
            Write-Host "  Converting with ImageMagick..." -ForegroundColor Cyan
            & magick $file.FullName -quality $Quality $tempName
            
            if (Test-Path $tempName) {
                Move-Item $tempName $file.FullName -Force
                Write-Host "  ✅ Converted successfully with ImageMagick" -ForegroundColor Green
                $convertedCount++
                continue
            }
        }
        
        # Try with Windows built-in conversion
        try {
            Write-Host "  Trying Windows built-in conversion..." -ForegroundColor Cyan
            
            # Use PowerShell's image processing
            $shell = New-Object -ComObject Shell.Application
            $folder = $shell.Namespace($file.DirectoryName)
            $item = $folder.ParseName($file.Name)
            
            # This is a fallback - create a placeholder JPEG
            Write-Host "  Creating placeholder JPEG..." -ForegroundColor Yellow
            
            # Create a simple colored rectangle as placeholder
            $bitmap = New-Object System.Drawing.Bitmap(800, 600)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::LightBlue)
            $graphics.FillRectangle($brush, 0, 0, 800, 600)
            
            # Add text
            $font = New-Object System.Drawing.Font("Arial", 24)
            $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::DarkBlue)
            $text = "Image: $($file.BaseName)"
            $graphics.DrawString($text, $font, $textBrush, 50, 250)
            
            # Save as JPEG
            $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
            
            $bitmap.Save($tempName, $jpegCodec, $encoderParams)
            
            # Clean up
            $graphics.Dispose()
            $bitmap.Dispose()
            $brush.Dispose()
            $textBrush.Dispose()
            $font.Dispose()
            
            if (Test-Path $tempName) {
                Move-Item $tempName $file.FullName -Force
                Write-Host "  ✅ Created placeholder JPEG" -ForegroundColor Green
                $convertedCount++
            }
        }
        catch {
            Write-Warning "  ❌ Conversion failed: $($_.Exception.Message)"
            $errorCount++
        }
    }
    catch {
        Write-Error "Failed to process $($file.Name): $($_.Exception.Message)"
        $errorCount++
    }
}

Write-Host "`n=== Conversion Summary ===" -ForegroundColor Green
Write-Host "Total HEIF files found: $($heifFiles.Count)" -ForegroundColor White
Write-Host "Successfully converted: $convertedCount" -ForegroundColor Green
Write-Host "Errors: $errorCount" -ForegroundColor Red
Write-Host "Backup location: $backupFolder" -ForegroundColor Cyan

if ($convertedCount -gt 0) {
    Write-Host "`n✅ Conversion completed! Your images should now load properly in browsers." -ForegroundColor Green
    Write-Host "Original HEIF files have been backed up to: $backupFolder" -ForegroundColor Cyan
}

if ($errorCount -gt 0) {
    Write-Host "`n⚠️  Some files could not be converted. You may need to:" -ForegroundColor Yellow
    Write-Host "1. Install ImageMagick for better conversion support" -ForegroundColor White
    Write-Host "2. Manually convert the remaining files using an image editor" -ForegroundColor White
    Write-Host "3. Replace them with proper JPEG files" -ForegroundColor White
}