from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
from datetime import datetime, timedelta

# Import models
from models.schemas import (
    Control, Resource, SimulationRequest, SimulationResult, 
    ControlStatus, ControlSeverity
)

# Import services
from services import metrics_engine, ai_reasoning, mock_data, bigquery_service
from services.gcp_auth_helper import ensure_credentials

# Run early credential detection/placement
ensure_credentials()

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

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Orbyte Backend is running"}

@app.get("/api/overview")
async def get_overview():
    # Try BigQuery first, fall back to mock if empty/failed
    try:
        controls = bigquery_service.get_controls_from_bq()
        resources = bigquery_service.get_resources_from_bq()
        if not controls or not resources:
            raise Exception("Empty BigQuery result")
    except Exception as e:
        print(f"[Orbyte] BigQuery failed or empty, using mock data: {e}")
        controls = mock_data.get_mock_controls()
        resources = mock_data.get_mock_resources()
    
    # Compute metrics
    framework_scores = metrics_engine.compute_framework_compliance(controls)
    compliance_score = metrics_engine.compute_overall_compliance_score(controls)
    sust_metrics = metrics_engine.compute_sustainability_metrics(resources)
    open_risks = metrics_engine.get_open_risks(controls)
    
    # Mock trends (could be fetched from BQ in future)
    today = datetime.now()
    compliance_trend = [
        {"timestamp": (today - timedelta(days=i*5)).isoformat(), "score": max(60, compliance_score - i*2)}
        for i in range(6)
    ][::-1]
    
    emissions_trend = [
        {"timestamp": (today - timedelta(days=i*5)).isoformat(), "emissions_kg": max(100, sust_metrics["total_monthly_emissions_kg"] + i*50)}
        for i in range(6)
    ][::-1]
    
    top_issues = []
    for c in controls:
        if c.status == ControlStatus.FAIL:
            top_issues.append({
                "type": "compliance",
                "description": f"Control {c.id} ({c.name}) is failing",
                "severity": c.severity.value,
                "status": "Open",
                "last_updated": today.isoformat()
            })
            
    return {
        "compliance_score": round(compliance_score, 1),
        "sustainability_score": round(sust_metrics["sustainability_score"], 1),
        "open_risks": sum(open_risks.values()),
        "framework_scores": framework_scores,
        "compliance_trend": compliance_trend,
        "emissions_trend": emissions_trend,
        "top_issues": top_issues[:5]
    }

@app.get("/api/compliance/controls", response_model=List[Control])
async def get_controls():
    try:
        controls = bigquery_service.get_controls_from_bq()
        if not controls:
            raise Exception("Empty BigQuery result")
    except Exception as e:
        print(f"[Orbyte] BigQuery controls fallback: {e}")
        controls = mock_data.get_mock_controls()
    return controls

@app.post("/api/compliance/controls/{control_id}/analysis")
async def analyze_control(control_id: str):
    # Fetch control details
    try:
        controls = bigquery_service.get_controls_from_bq()
        if not controls:
            raise Exception("Empty BigQuery result")
    except Exception:
        controls = mock_data.get_mock_controls()
        
    control = next((c for c in controls if c.id == control_id), None)
    if not control:
        raise HTTPException(status_code=404, detail="Control not found")
    
    # Mock evidence (in real app, fetch from BQ evidence table)
    evidence = [
        {"type": "iam_policy", "detail": "enforce_ssl=true on 80% of resources"},
        {"type": "log_sample", "detail": "No failed login attempts in last 24h"}
    ]
    
    result = await ai_reasoning.generate_implementation_statement(control, evidence)
    return result

@app.get("/api/sustainability/metrics")
async def get_sustainability_metrics():
    try:
        resources = bigquery_service.get_resources_from_bq()
        if not resources:
            raise Exception("Empty BigQuery result")
    except Exception as e:
        print(f"[Orbyte] BigQuery resources fallback: {e}")
        resources = mock_data.get_mock_resources()
    
    metrics = metrics_engine.compute_sustainability_metrics(resources)
    
    # Generate AI insight
    worst_region = None
    if metrics["emissions_by_region"]:
        worst_region = max(metrics["emissions_by_region"], key=lambda x: x["emissions_kg"])["region"]
        
    insight = ai_reasoning.generate_sustainability_insight(
        metrics["total_monthly_emissions_kg"],
        metrics["potential_monthly_emissions_savings_kg"],
        len(metrics["idle_resources"]),
        worst_region
    )
    
    metrics["ai_insight"] = insight
    return metrics

@app.post("/api/simulations/run", response_model=SimulationResult)
def run_simulation(request: SimulationRequest):
    # Use BQ or Mock resources
    try:
        resources = bigquery_service.get_resources_from_bq()
        if not resources:
            raise Exception("Empty BigQuery result")
    except Exception:
        resources = mock_data.get_mock_resources()
    
    # Basic simulation logic
    emissions_reduction = 0.0
    cost_savings = 0.0
    
    if request.simulation_type == "idle_shutdown":
        metrics = metrics_engine.compute_sustainability_metrics(resources)
        idle_resources = metrics["idle_resources"]
        
        # Apply workload percent
        count_to_shutdown = int(len(idle_resources) * (request.workload_percent / 100.0))
        affected = idle_resources[:count_to_shutdown]
        
        for r in affected:
            # Assume 10 hours shutdown per day
            daily_emissions = metrics_engine.estimate_daily_emissions_kg(r)
            emissions_reduction += daily_emissions * (10/24) * 30
            cost_savings += r.daily_cost_usd * (10/24) * 30
            
    elif request.simulation_type == "region_migration":
        # Simplified migration logic
        # Assume 20% reduction if moving to cleaner region
        metrics = metrics_engine.compute_sustainability_metrics(resources)
        total_emissions = metrics["total_monthly_emissions_kg"]
        emissions_reduction = total_emissions * 0.2 * (request.workload_percent / 100.0)
        cost_savings = 50.0 # Mock
        
    # Get AI narrative
    narrative = ai_reasoning.generate_scenario_narrative(
        request.simulation_type,
        request.dict(),
        emissions_reduction,
        cost_savings
    )
    
    return SimulationResult(
        estimated_emissions_reduction_kg=emissions_reduction,
        estimated_cost_savings_usd=cost_savings,
        risk_summary=narrative["risk_summary"],
        detail_summary=narrative["detail_summary"]
    )
