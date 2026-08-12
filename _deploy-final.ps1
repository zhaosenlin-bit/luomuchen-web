Set-Location "D:\my lon\my-ai-learning\projects\my_web"

# 1. Commit vite.config.ts and index.html source reset to main
Write-Host "=== Commit source changes to main ==="
cmd /c "git add -A" 2>&1 | Out-Null
cmd /c "git commit -m `"Fix: base path for GitHub Pages + restore source index.html`"" 2>&1 | Select-Object -Last 3
$pushMain = cmd /c "git push origin main" 2>&1
Write-Host $pushMain | Select-Object -First 5

# 2. Switch to gh-pages, clean, copy new dist
Write-Host ""
Write-Host "=== Switch to gh-pages, clean, copy new dist ==="
cmd /c "git checkout gh-pages" 2>&1 | Select-Object -Last 2
# Remove everything except .git
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | ForEach-Object {
    if ($_.PSIsContainer) { Remove-Item -Recurse -Force $_.FullName } else { Remove-Item -Force $_.FullName }
}
# Copy new dist contents
Get-ChildItem dist -Force | ForEach-Object {
    if ($_.PSIsContainer) { Copy-Item -Recurse -Force $_.FullName . } else { Copy-Item -Force $_.FullName . }
}
Remove-Item -Recurse -Force dist
Write-Host ""
Write-Host "Files in gh-pages:"
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Select-Object Name | Format-Table -AutoSize

Write-Host ""
Write-Host "=== Commit and push gh-pages ==="
cmd /c "git add -A" 2>&1 | Out-Null
cmd /c "git commit -m `"Deploy: rebuild with base path fix`"" 2>&1 | Select-Object -Last 3
$pushPages = cmd /c "git push origin gh-pages" 2>&1
Write-Host $pushPages | Select-Object -First 5

# Back to main
cmd /c "git checkout main" 2>&1 | Select-Object -Last 2