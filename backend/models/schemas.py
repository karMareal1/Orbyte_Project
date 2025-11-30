from pydantic import BaseModel
from typing import List, Optional, Literal
from enum import Enum
from datetime import datetime

class ControlSeverity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class ControlStatus(str, Enum):
    PASS = "pass"
    FAIL = "fail"
    AT_RISK = "at_risk"

class Control(BaseModel):
    id: str           # "AC-2"
    name: str         # "Account Management"
    framework: str    # "NIST 800-53"
    severity: ControlSeverity
    status: ControlStatus
    evidence_count: int
    description: Optional[str] = None

class Resource(BaseModel):
    id: str           # "vm-123"
    name: str
    type: str         # "vm", "db", "bucket"
    region: str       # "us-central1"
    instance_type: str  # "n1-standard-4"
    avg_cpu_7d: float   # 0.0 - 1.0
    avg_hours_per_day: float
    last_active_days_ago: int
    daily_cost_usd: float
    last_active_at: Optional[datetime] = None # Added for compatibility with logic

class EmissionSample(BaseModel):
    region: str
    emissions_kg: float
    timestamp: datetime

class SimulationRequest(BaseModel):
    simulation_type: str  # "idle_shutdown" | "region_migration" | "enable_encryption"
    source_region: Optional[str] = None
    target_region: Optional[str] = None
    workload_percent: int  # 0-100

class SimulationResult(BaseModel):
    estimated_emissions_reduction_kg: float
    estimated_cost_savings_usd: float
    risk_summary: str
    detail_summary: str
