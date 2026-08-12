Set-Location "D:\my lon\my-ai-learning\projects\my_web"

# Clean working dir on main
Write-Host "=== Clean dist and build artifacts from main ==="
Get-ChildItem -Force | Where-Object { $_.Name -in @("dist", "assets", "tsconfig.tsbuildinfo", "tsconfig.node.tsbuildinfo", "vite.config.d.ts", "vite.config.js", "_setup-token.ps1", "_fix-base.ps1") } | ForEach-Object {
    if ($_.PSIsContainer) { Remove-Item -Recurse -Force $_.FullName } else { Remove-Item -Force $_.FullName }
    Write-Host "Removed: $($_.Name)"
}

Write-Host ""
Write-Host "=== Commit vite.config.ts base path fix to main ==="
cmd /c "git add -A" 2>&1 | Out-Null
cmd /c "git commit -m `"Fix: add base path for GitHub Pages subdirectory`"" 2>&1 | Select-Object -Last 3
cmd /c "git push origin main" 2>&1 | Select-Object -Last 5

Write-Host ""
Write-Host "=== Now create clean gh-pages branch with new dist ==="
# Switch to gh-pages, wipe, copy new dist
cmd /c "git checkout gh-pages" 2>&1 | Select-Object -Last 2
Get-ChildItem -Force | Where-Object { $_.Name -notin @(".git", "src", "public", "node_modules") } | ForEach-Object {
    if ($_.PSIsContainer) { Remove-Item -Recurse -Force $_.FullName } else { Remove-Item -Force $_.FullName }
}
Get-ChildItem dist -Force | ForEach-Object {
    if ($_.PSIsContainer) { Copy-Item -Recurse -Force $_.FullName . } else { Copy-Item -Force $_.FullName . }
}
Remove-Item -Recurse -Force dist
cmd /c "git add -A" 2>&1 | Out-Null
cmd /c "git commit -m `"Deploy: rebuild with base path fix`"" 2>&1 | Select-Object -Last 3
cmd /c "git push origin gh-pages" 2>&1 | Select-Object -Last 5
cmd /c "git checkout main" 2>&1 | Select-Object -Last 2

Write-Host ""
Write-Host "=== Verify gh-pages content ==="
cmd /c "git show gh-pages:index.html" 2>&1 | Out-String