# Image Optimization Script for 2024 Walle Pals Website
# This script optimizes images for better web performance

Write-Host "🚀 Optimizing Images for Web Performance..." -ForegroundColor Cyan
Write-Host "=" * 60

# Define paths
$directories = @("assets\school", "assets\friends", "assets\memories", "assets\images", "assets\pasandu")

# Function to get file size in KB
function Get-FileSizeKB {
    param($filePath)
    return [math]::Round((Get-Item $filePath).Length / 1KB, 2)
}

# Function to optimize JPEG using PowerShell
function Optimize-JpegImage {
    param($inputPath, $quality = 85)
    
    try {
        Add-Type -AssemblyName System.Drawing
        
        $originalImage = [System.Drawing.Image]::FromFile($inputPath)
        $originalSize = Get-FileSizeKB $inputPath
        
        # Create JPEG encoder with specified quality
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        
        # Save optimized version
        $tempPath = $inputPath + ".optimized"
        $originalImage.Save($tempPath, $jpegCodec, $encoderParams)
        $originalImage.Dispose()
        
        $optimizedSize = Get-FileSizeKB $tempPath
        $savings = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
        
        # Only replace if we achieved significant savings (>10%) or file was very large (>500KB)
        if ($savings -gt 10 -or $originalSize -gt 500) {
            Move-Item $tempPath $inputPath -Force
            return @{
                Success = $true
                OriginalSize = $originalSize
                OptimizedSize = $optimizedSize
                Savings = $savings
            }
        } else {
            Remove-Item $tempPath -Force -ErrorAction SilentlyContinue
            return @{
                Success = $false
                OriginalSize = $originalSize
                OptimizedSize = $originalSize
                Savings = 0
                Reason = "Minimal savings ($savings%)"
            }
        }
    } catch {
        return @{
            Success = $false
            Error = $_.Exception.Message
        }
    }
}

Write-Host "`n📊 Analyzing current image sizes..." -ForegroundColor Yellow

$allImages = @()
$totalSize = 0

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        $images = Get-ChildItem -Path $dir -Filter "*.jpg" -ErrorAction SilentlyContinue
        foreach ($image in $images) {
            $size = Get-FileSizeKB $image.FullName
            $totalSize += $size
            $allImages += @{
                Path = $image.FullName
                RelativePath = $image.FullName.Replace((Get-Location).Path + "\", "")
                Name = $image.Name
                Size = $size
                Directory = $dir
            }
        }
    }
}

Write-Host "Found $($allImages.Count) JPEG images" -ForegroundColor White
Write-Host "Total size: $([math]::Round($totalSize / 1024, 2)) MB" -ForegroundColor White

# Sort by size to prioritize large files
$allImages = $allImages | Sort-Object Size -Descending

Write-Host "`n📋 Top 10 largest images:" -ForegroundColor Cyan
$allImages | Select-Object -First 10 | ForEach-Object {
    Write-Host "  $($_.Name): $($_.Size) KB" -ForegroundColor White
}

Write-Host "`n🔧 Starting optimization process..." -ForegroundColor Yellow

# Create backup directory
$backupPath = "assets\optimization_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
if (!(Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
    Write-Host "Created backup directory: $backupPath" -ForegroundColor Green
}

$optimizedCount = 0
$totalSavings = 0
$skippedCount = 0

foreach ($image in $allImages) {
    Write-Host "`nProcessing: $($image.Name) ($($image.Size) KB)" -ForegroundColor Cyan
    
    # Skip very small images (< 50KB)
    if ($image.Size -lt 50) {
        Write-Host "  ⏭️  Skipped (too small)" -ForegroundColor Gray
        $skippedCount++
        continue
    }
    
    # Create backup for larger files
    if ($image.Size -gt 200) {
        $backupFile = Join-Path $backupPath $image.Name
        try {
            Copy-Item $image.Path $backupFile -Force
            Write-Host "  📁 Backed up" -ForegroundColor Gray
        } catch {
            Write-Warning "  ⚠️  Could not create backup"
        }
    }
    
    # Determine quality based on file size
    $quality = if ($image.Size -gt 1000) { 75 } elseif ($image.Size -gt 500) { 80 } else { 85 }
    
    $result = Optimize-JpegImage -inputPath $image.Path -quality $quality
    
    if ($result.Success) {
        Write-Host "  ✅ Optimized: $($result.OriginalSize) KB → $($result.OptimizedSize) KB ($($result.Savings)% saved)" -ForegroundColor Green
        $optimizedCount++
        $totalSavings += ($result.OriginalSize - $result.OptimizedSize)
    } else {
        if ($result.Reason) {
            Write-Host "  ⏭️  $($result.Reason)" -ForegroundColor Yellow
            $skippedCount++
        } else {
            Write-Host "  ❌ Failed: $($result.Error)" -ForegroundColor Red
        }
    }
}

Write-Host "`n🔧 Creating WebP versions for modern browsers..." -ForegroundColor Yellow

# Check if we can create WebP versions
$webpSupported = $false
$magickPath = Get-Command "magick" -ErrorAction SilentlyContinue
if ($magickPath) {
    $webpSupported = $true
    Write-Host "ImageMagick found - creating WebP versions" -ForegroundColor Green
    
    $webpCount = 0
    foreach ($image in ($allImages | Select-Object -First 20)) {  # Convert top 20 images
        $webpPath = $image.Path -replace "\.jpg$", ".webp"
        try {
            & magick $image.Path -quality 80 $webpPath
            if (Test-Path $webpPath) {
                $webpSize = Get-FileSizeKB $webpPath
                Write-Host "  ✅ Created WebP: $($image.Name) → $webpSize KB" -ForegroundColor Green
                $webpCount++
            }
        } catch {
            Write-Host "  ❌ WebP conversion failed for $($image.Name)" -ForegroundColor Red
        }
    }
    Write-Host "Created $webpCount WebP images" -ForegroundColor Green
} else {
    Write-Host "ImageMagick not available - skipping WebP creation" -ForegroundColor Yellow
    Write-Host "Install ImageMagick to enable WebP conversion" -ForegroundColor Gray
}

Write-Host "`n🔧 Creating responsive image variants..." -ForegroundColor Yellow

# Create thumbnail versions for key images
$thumbnailDir = "assets\thumbnails"
if (!(Test-Path $thumbnailDir)) {
    New-Item -ItemType Directory -Path $thumbnailDir -Force | Out-Null
    Write-Host "Created thumbnails directory" -ForegroundColor Green
}

$thumbnailCount = 0
$keyImages = $allImages | Where-Object { $_.Directory -eq "assets\school" -and $_.Size -gt 100 } | Select-Object -First 10

foreach ($image in $keyImages) {
    try {
        Add-Type -AssemblyName System.Drawing
        
        $originalImage = [System.Drawing.Image]::FromFile($image.Path)
        $thumbnailSize = 200
        
        # Calculate proportional dimensions
        $ratio = [math]::Min($thumbnailSize / $originalImage.Width, $thumbnailSize / $originalImage.Height)
        $newWidth = [int]($originalImage.Width * $ratio)
        $newHeight = [int]($originalImage.Height * $ratio)
        
        # Create thumbnail
        $thumbnail = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($thumbnail)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($originalImage, 0, 0, $newWidth, $newHeight)
        
        # Save thumbnail
        $thumbnailPath = Join-Path $thumbnailDir ("thumb_" + $image.Name)
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80)
        
        $thumbnail.Save($thumbnailPath, $jpegCodec, $encoderParams)
        
        # Clean up
        $graphics.Dispose()
        $thumbnail.Dispose()
        $originalImage.Dispose()
        
        $thumbSize = Get-FileSizeKB $thumbnailPath
        Write-Host "  ✅ Created thumbnail: thumb_$($image.Name) ($thumbSize KB)" -ForegroundColor Green
        $thumbnailCount++
    } catch {
        Write-Host "  ❌ Thumbnail creation failed for $($image.Name)" -ForegroundColor Red
    }
}

Write-Host "`n📊 OPTIMIZATION SUMMARY:" -ForegroundColor Cyan
Write-Host "=" * 40
Write-Host "Total images processed: $($allImages.Count)" -ForegroundColor White
Write-Host "Images optimized: $optimizedCount" -ForegroundColor Green
Write-Host "Images skipped: $skippedCount" -ForegroundColor Yellow
Write-Host "Total size saved: $([math]::Round($totalSavings / 1024, 2)) MB" -ForegroundColor Green
Write-Host "Thumbnails created: $thumbnailCount" -ForegroundColor Green
if ($webpSupported) {
    Write-Host "WebP images created: $webpCount" -ForegroundColor Green
}
Write-Host "Backup location: $backupPath" -ForegroundColor Cyan

# Calculate new total size
$newTotalSize = 0
foreach ($image in $allImages) {
    if (Test-Path $image.Path) {
        $newTotalSize += Get-FileSizeKB $image.Path
    }
}

$totalSavingsPercent = [math]::Round((($totalSize - $newTotalSize) / $totalSize) * 100, 1)

Write-Host "`n📈 Performance Impact:" -ForegroundColor Cyan
Write-Host "Original total size: $([math]::Round($totalSize / 1024, 2)) MB" -ForegroundColor White
Write-Host "Optimized total size: $([math]::Round($newTotalSize / 1024, 2)) MB" -ForegroundColor Green
Write-Host "Total savings: $totalSavingsPercent%" -ForegroundColor Green

Write-Host "`n💡 Additional Recommendations:" -ForegroundColor Cyan
Write-Host "1. Implement lazy loading for images below the fold" -ForegroundColor White
Write-Host "2. Use responsive images with srcset attribute" -ForegroundColor White
Write-Host "3. Consider using WebP images with JPEG fallback" -ForegroundColor White
Write-Host "4. Add proper alt text for accessibility" -ForegroundColor White
Write-Host "5. Use CSS sprites for small icons" -ForegroundColor White

if ($optimizedCount -gt 0) {
    Write-Host "`n🎉 Image optimization completed successfully!" -ForegroundColor Green
    Write-Host "Your website should now load faster with optimized images." -ForegroundColor Green
} else {
    Write-Host "`n✅ Images were already well optimized!" -ForegroundColor Green
}

Write-Host "`n✅ Image optimization process complete!" -ForegroundColor Green