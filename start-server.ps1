# KV Constructions - Local Dev Server
# Right-click this file and select "Run with PowerShell"
# Or open PowerShell and type: .\start-server.ps1

$port = 3000
$dir = "C:\development\kvconstructions"

Write-Host "Starting local server at http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

Set-Location $dir
python -m http.server $port --bind 127.0.0.1
