<#
.SYNOPSIS
    DevBrain Integrity Check (Windows PowerShell)
    Verifica la integridad de archivos criticos del proyecto.
#>
param(
    [switch]$Fast
)

$ErrorActionPreference = "Continue"
$ProjectRoot = $PSScriptRoot | Split-Path -Parent
Set-Location $ProjectRoot

Write-Host "[DevBrain] Verificando integridad..." -ForegroundColor Cyan

$errors = 0

# Archivos criticos del sitio web
$webFiles = @(
    "web\index.html",
    "web\css\styles.css",
    "web\js\main.js",
    "web\js\modules-content.js",
    "web\js\code-renderer.js",
    "web\js\simulators.js",
    "web\js\gamification.js"
)

foreach ($f in $webFiles) {
    if (-not (Test-Path $f)) {
        Write-Host "   [MISSING] $f" -ForegroundColor Red
        $errors++
    } else {
        Write-Host "   [OK] $f" -ForegroundColor Green
    }
}

# Archivos criticos de recursos
$resourceFiles = @(
    "recursos\sql\micro_inventario_db.sql",
    "recursos\docker\Dockerfile",
    "recursos\docker\docker-compose.yml",
    "recursos\codigo-ejemplo\main.py",
    "recursos\codigo-ejemplo\database.py",
    "recursos\codigo-ejemplo\models.py",
    "recursos\codigo-ejemplo\requirements.txt"
)

foreach ($f in $resourceFiles) {
    if (-not (Test-Path $f)) {
        Write-Host "   [MISSING] $f" -ForegroundColor Red
        $errors++
    } else {
        Write-Host "   [OK] $f" -ForegroundColor Green
    }
}

if (-not $Fast) {
    # Verificar routers y schemas
    $pythonFiles = @(
        "recursos\codigo-ejemplo\routers\productos.py",
        "recursos\codigo-ejemplo\routers\usuarios.py",
        "recursos\codigo-ejemplo\schemas\__init__.py"
    )
    
    foreach ($f in $pythonFiles) {
        if (-not (Test-Path $f)) {
            Write-Host "   [MISSING] $f" -ForegroundColor Red
            $errors++
        } else {
            Write-Host "   [OK] $f" -ForegroundColor Green
        }
    }
}

if ($errors -eq 0) {
    Write-Host "`nIntegridad OK - Todos los archivos criticos presentes" -ForegroundColor Green
} else {
    Write-Host "`n$errors archivo(s) faltante(s) detectado(s)" -ForegroundColor Red
}
