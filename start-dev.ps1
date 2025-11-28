# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; if (Test-Path venv) { .\venv\Scripts\Activate }; uvicorn main:app --reload"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Orbyte development environment starting..."
Write-Host "Backend: http://127.0.0.1:8000"
Write-Host "Frontend: http://localhost:3000"
