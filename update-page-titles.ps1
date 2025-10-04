# PowerShell script to add logo emoji to all page titles
Write-Host "=== Adding Logo to Page Titles ===" -ForegroundColor Green

# Get all HTML files in friends directory
$friendsFiles = Get-ChildItem "friends\*.html" -Exclude "template-advanced.html"
$updatedCount = 0
$errorCount = 0

Write-Host "Found $($friendsFiles.Count) friend pages to update" -ForegroundColor Cyan

foreach ($file in $friendsFiles) {
    try {
        Write-Host "Updating: $($file.Name)..." -ForegroundColor Yellow
        
        # Read the file content
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Replace title tags that don't already have the logo
        if ($content -match '<title>([^🏠].*?)</title>') {
            $newContent = $content -replace '<title>([^🏠].*?)</title>', '<title>🏠 $1</title>'
            
            # Write back to file
            Set-Content $file.FullName -Value $newContent -Encoding UTF8
            Write-Host "  ✅ Updated successfully" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "  ⏭️  Already has logo or no title found" -ForegroundColor Gray
        }
    } catch {
        Write-Error "  ❌ Failed to update $($file.Name): $($_.Exception.Message)"
        $errorCount++
    }
}

Write-Host "`n=== Update Summary ===" -ForegroundColor Green
Write-Host "Files updated: $updatedCount" -ForegroundColor Green
Write-Host "Errors: $errorCount" -ForegroundColor Red
Write-Host "Logo added: 🏠" -ForegroundColor Cyan

if ($updatedCount -gt 0) {
    Write-Host "`n✅ All page titles now include the logo!" -ForegroundColor Green
    Write-Host "The 🏠 emoji will appear in browser tabs for all pages." -ForegroundColor Cyan
}