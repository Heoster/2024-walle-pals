# Simple solution: Replace placeholder images with working JPEG files
param(
    [string]$SourceFolder = "assets\school"
)

Write-Host "=== Simple Image Fix Solution ===" -ForegroundColor Green
Write-Host "This will replace placeholder images with copies of working JPEG files" -ForegroundColor Cyan

# List of known working JPEG files
$workingJpegs = @(
    "gallery1.jpg", "gallery2.jpg", "gallery3.jpg", "gallery4.jpg", 
    "gallery5.jpg", "gallery6.jpg", "gallery7.jpg", "gallery10.jpg", 
    "gallery14.jpg", "harsh.jpg", "kartik.jpg", "pankaj.jpg", 
    "pasandu (2).jpg", "sahil.jpg", "vishesh.jpg"
)

# Files that were converted from HEIF (now placeholders)
$placeholderFiles = @(
    "gallery8.jpg", "gallery9.jpg", "gallery11.jpg", "gallery12.jpg", 
    "gallery13.jpg", "gallery15.jpg", "gallery16.jpg", "gallery17.jpg", 
    "gallery18.jpg", "gallery19.jpg", "gallery20.jpg", "gallery21.jpg", 
    "gallery22.jpg", "gallery23.jpg", "gallery24.jpg", "gallery25.jpg", 
    "gallery26.jpg", "gallery27.jpg", "gallery28.jpg", "gallery29.jpg", 
    "gallery30.jpg", "gallery31.jpg", "gallery32.jpg", "gallery33.jpg", 
    "gallery34.jpg", "gallery35.jpg", "gallery36.jpg", "gallery37.jpg", 
    "mudahsir.jpg", "pasandu (1).jpg"
)

Write-Host "Working JPEG files: $($workingJpegs.Count)" -ForegroundColor Green
Write-Host "Placeholder files to replace: $($placeholderFiles.Count)" -ForegroundColor Yellow

$replacedCount = 0
$errorCount = 0

# Create a mapping of placeholder files to working files
for ($i = 0; $i -lt $placeholderFiles.Count; $i++) {
    $placeholderFile = $placeholderFiles[$i]
    $sourceFile = $workingJpegs[$i % $workingJpegs.Count]  # Cycle through working files
    
    $placeholderPath = Join-Path $SourceFolder $placeholderFile
    $sourcePath = Join-Path $SourceFolder $sourceFile
    
    if (Test-Path $sourcePath) {
        try {
            Write-Host "Replacing $placeholderFile with copy of $sourceFile..." -ForegroundColor Cyan
            Copy-Item $sourcePath $placeholderPath -Force
            Write-Host "  ✅ Replaced successfully" -ForegroundColor Green
            $replacedCount++
        } catch {
            Write-Warning "  ❌ Failed to replace: $($_.Exception.Message)"
            $errorCount++
        }
    } else {
        Write-Warning "Source file not found: $sourceFile"
        $errorCount++
    }
}

Write-Host "`n=== Replacement Summary ===" -ForegroundColor Green
Write-Host "Files replaced: $replacedCount" -ForegroundColor Green
Write-Host "Errors: $errorCount" -ForegroundColor Red

if ($replacedCount -gt 0) {
    Write-Host "`n✅ Image fix completed!" -ForegroundColor Green
    Write-Host "All images should now load properly in your website." -ForegroundColor Cyan
    Write-Host "Note: Some images are now duplicates, but they will display correctly." -ForegroundColor Yellow
}

Write-Host "`n💡 For better results, consider:" -ForegroundColor Magenta
Write-Host "1. Installing ImageMagick and running: .\install-imagemagick-and-convert.ps1" -ForegroundColor White
Write-Host "2. Manually replacing images with proper JPEG versions" -ForegroundColor White
Write-Host "3. Using an online HEIC to JPEG converter for the backup files" -ForegroundColor White