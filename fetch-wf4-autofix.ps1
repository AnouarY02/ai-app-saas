# Haal wf4-autofix.json op van 127.0.0.1
# Voer dit uit in PowerShell - je wordt gevraagd om je wachtwoord

scp anoua@127.0.0.1:/home/user/ai-app-saas/wf4-autofix.json C:\Users\anoua\ai-app-saas\

if (Test-Path "C:\Users\anoua\ai-app-saas\wf4-autofix.json") {
    Write-Host "OK: wf4-autofix.json is opgehaald!" -ForegroundColor Green
} else {
    Write-Host "Fout: Bestand niet gevonden. Probeer met user@127.0.0.1 als anoua niet werkt." -ForegroundColor Yellow
}
