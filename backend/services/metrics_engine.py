from typing import List, Dict, Literal
from datetime import datetime, timezone
from models.schemas import Control, Resource, ControlSeverity, ControlStatus

# Constants
WEIGHT_BY_SEVERITY = {
    ControlSeverity.CRITICAL: 5,
    ControlSeverity.HIGH: 3,
    ControlSeverity.MEDIUM: 2,
    ControlSeverity.LOW: 1,
}

GRID_INTENSITY = {
    "us-central1": 0.45,     # kg CO2e per kWh
    "europe-west4": 0.18,
    "us-west1": 0.05,
}

INSTANCE_POWER_KW = {
    "n1-standard-1": 0.05,
    "n1-standard-4": 0.17,
    "n1-highcpu-32": 1.40,
}

PUE = 1.1  # constant overhead factor

def compute_framework_compliance(controls: List[Control]) -> Dict[str, float]:
    """
    Computes a weighted compliance score (0-100) per framework.
    """
    by_framework: Dict[str, List[Control]] = {}
    for c in controls:
        by_framework.setdefault(c.framework, []).append(c)

    scores: Dict[str, float] = {}

    for fw, fw_controls in by_framework.items():
        total_weight = sum(WEIGHT_BY_SEVERITY[c.severity] for c in fw_controls)
        if total_weight == 0:
            scores[fw] = 100.0
            continue

        passing_weight = sum(
            WEIGHT_BY_SEVERITY[c.severity]
            for c in fw_controls
            if c.status == ControlStatus.PASS
        )
        scores[fw] = (passing_weight / total_weight) * 100.0

    return scores

def compute_overall_compliance_score(controls: List[Control]) -> float:
    """
    Computes a weighted compliance score (0-100) across ALL controls.
    """
    total_weight = sum(WEIGHT_BY_SEVERITY[c.severity] for c in controls)
    if total_weight == 0:
        return 100.0

    passing_weight = sum(
        WEIGHT_BY_SEVERITY[c.severity]
        for c in controls
        if c.status == ControlStatus.PASS
    )
    return (passing_weight / total_weight) * 100.0

def get_open_risks(controls: List[Control]) -> Dict[str, int]:
    """
    Counts how many controls are failing or at risk for each severity bucket.
    """
    risks = {
        "critical": 0,
        "high": 0,
        "medium": 0,
        "low": 0
    }
    
    for c in controls:
        if c.status != ControlStatus.PASS:
            risks[c.severity.value] += 1
            
    return risks

def estimate_daily_emissions_kg(resource: Resource) -> float:
    """
    Estimates daily emissions for a single resource.
    Formula: hours * power_kw * grid_intensity * PUE
    """
    power_kw = INSTANCE_POWER_KW.get(resource.instance_type, 0.2)
    intensity = GRID_INTENSITY.get(resource.region, 0.5)
    hours = resource.avg_hours_per_day
    return hours * power_kw * intensity * PUE

def compute_sustainability_metrics(resources: List[Resource]) -> Dict:
    """
    Computes sustainability metrics including total emissions, idle resources, and potential savings.
    """
    total_monthly_emissions = 0.0
    emissions_by_region: Dict[str, float] = {}
    idle_resources: List[Resource] = []
    potential_emissions_savings = 0.0
    potential_cost_savings = 0.0

    for r in resources:
        daily_emissions = estimate_daily_emissions_kg(r)
        monthly_emissions = daily_emissions * 30
        total_monthly_emissions += monthly_emissions
        emissions_by_region[r.region] = emissions_by_region.get(r.region, 0.0) + monthly_emissions

        # idle detection: low CPU + inactive for a few days
        # Using last_active_days_ago as proxy for "inactive for a few days" check
        if r.avg_cpu_7d < 0.05 and r.last_active_days_ago > 3:
            idle_resources.append(r)
            potential_emissions_savings += monthly_emissions
            potential_cost_savings += r.daily_cost_usd * 30

    # sustainability score heuristic
    if total_monthly_emissions == 0:
        score = 100.0
    else:
        ratio = potential_emissions_savings / total_monthly_emissions
        ratio = max(0.0, min(ratio, 0.5))  # clamp 0–0.5
        score = 40.0 + (ratio / 0.5) * 55.0  # 40..95

    return {
        "total_monthly_emissions_kg": total_monthly_emissions,
        "emissions_by_region": [
            {"region": region, "emissions_kg": value}
            for region, value in emissions_by_region.items()
        ],
        "idle_resources": idle_resources,
        "potential_monthly_emissions_savings_kg": potential_emissions_savings,
        "potential_monthly_cost_savings_usd": potential_cost_savings,
        "sustainability_score": score,
    }
