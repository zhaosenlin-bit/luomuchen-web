Set-Location "D:\my lon\my-ai-learning\projects\my_web"

# 1. Update vite config with base path
Write-Host "=== Update vite.config.ts ==="
$vite = @"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/luomuchen-web/",
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});
"@
[System.IO.File]::WriteAllText("vite.config.ts", $vite, [System.Text.UTF8Encoding]::new($false))

# 2. Rebuild
Write-Host ""
Write-Host "=== Rebuild ==="
cmd /c "npm run build" 2>&1 | Out-Null
Write-Host "Done"
Get-ChildItem dist -Force | Select-Object Name, Length | Format-Table -AutoSize

# 3. Commit and push to gh-pages
Write-Host ""
Write-Host "=== Git: add + commit + push to gh-pages ==="
cmd /c "git checkout gh-pages" 2>&1 | Select-Object -Last 2
Get-ChildItem dist -Force | ForEach-Object {
    $dest = Join-Path "." $_.Name
    if ($_.PSIsContainer) {
        if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        Copy-Item -Recurse -Force $_.FullName $dest
    } else {
        Copy-Item -Force $_.FullName $dest
    }
}
cmd /c "git add -A" 2>&1 | Out-Null
cmd /c "git commit -m `"Fix base path for GitHub Pages subdirectory`"" 2>&1 | Select-Object -Last 3
cmd /c "git push origin gh-pages" 2>&1 | Select-Object -Last 5
cmd /c "git checkout main" 2>&1 | Select-Object -Last 2