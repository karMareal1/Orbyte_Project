from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import ai_service

app = FastAPI(title="Orbyte Backend")

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImplementationRequest(BaseModel):
    control_id: str
    control_description: str
    evidence_summary: str

class SustainabilityRequest(BaseModel):
    metrics: Dict[str, Any]

class ScenarioRequest(BaseModel):
    params: Dict[str, Any]
    numeric_results: Dict[str, Any]

@app.get("/")
def read_root():
    return {"message": "Orbyte Backend is running"}

@app.post("/api/ai/implementation-statement")
def create_implementation_statement(request: ImplementationRequest):
    try:
        text = ai_service.generate_implementation_statement(
            request.control_id,
            request.control_description,
            request.evidence_summary
        )
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/sustainability-insight")
def create_sustainability_insight(request: SustainabilityRequest):
    try:
        text = ai_service.generate_sustainability_insight(request.metrics)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/scenario-narrative")
def create_scenario_narrative(request: ScenarioRequest):
    try:
        text = ai_service.generate_scenario_narrative(request.params, request.numeric_results)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
