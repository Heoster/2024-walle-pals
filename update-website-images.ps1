# Comprehensive Website Image Update Script
# This script will fix image sizes and use accurate images according to their names

param(
    [switch]$DryRun = $false
)

Write-Host "=== Website Image Update Script ===" -ForegroundColor Green
Write-Host "This will update all images to use proper assets and fix sizing" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be modified" -ForegroundColor Yellow
}

# Define image mappings
$friendImageMappings = @{
    'harsh' = 'assets/school/harsh.jpg'
    'kartik' = 'assets/school/kartik.jpg'
    'mudahsir' = 'assets/school/mudahsir.jpg'
    'pankaj' = 'assets/school/pankaj.jpg'
    'pasandu' = 'assets/school/pasandu (1).jpg'
    'sahil' = 'assets/school/sahil.jpg'
    'vishesh' = 'assets/school/vishesh.jpg'
}

# Memory images mapping
$memoryImageMappings = @{}
for ($i = 1; $i -le 35; $i++) {
    $memoryImageMappings["memories$i"] = "assets/memories/memories$i.jpg"
}

# Gallery images mapping
$galleryImageMappings = @{}
for ($i = 1; $i -le 37; $i++) {
    $galleryImageMappings["gallery$i"] = "assets/school/gallery$i.jpg"
}
