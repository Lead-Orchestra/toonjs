# Script para ejecutar el análisis con correcta codificación UTF-8
# Configura PowerShell para mostrar correctamente emojis y caracteres especiales

# Guardar configuración original
$originalOutputEncoding = [Console]::OutputEncoding
$originalInputEncoding = $OutputEncoding

try {
    # Configurar UTF-8 para la consola
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    [Console]::InputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
    
    # Ejecutar el análisis
    Write-Host "🚀 Iniciando análisis empresarial con ToonJS..." -ForegroundColor Green
    Write-Host ""
    
    node analisis-empresarial.js
    
    Write-Host ""
    Write-Host "✅ Análisis completado" -ForegroundColor Green
    
} finally {
    # Restaurar configuración original
    [Console]::OutputEncoding = $originalOutputEncoding
    $OutputEncoding = $originalInputEncoding
}
