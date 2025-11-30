export interface Control {
    id: string;
    name: string;
    framework: string;
    severity: "critical" | "high" | "medium" | "low";
    status: "pass" | "fail" | "at_risk";
    evidence_count: number;
    description?: string;
}

export interface OverviewData {
    compliance_score: number;
    sustainability_score: number;
    open_risks: number;
    compliance_trend: Array<{ timestamp: string; score: number }>;
    emissions_trend: Array<{ timestamp: string; emissions_kg: number }>;
    top_issues: Array<{
        type: "compliance" | "sustainability";
        description: string;
        severity: "low" | "medium" | "high";
        status: string;
        last_updated: string;
    }>;
}

export interface SustainabilityMetrics {
    total_monthly_emissions_kg: number;
    emissions_by_region: Array<{ region: string; emissions_kg: number }>;
    idle_resources: Array<{
        id: string;
        name: string;
        type: string;
        region: string;
        instance_type: string;
        avg_cpu_7d: number;
        daily_cost_usd: number;
    }>;
    potential_monthly_emissions_savings_kg: number;
    potential_monthly_cost_savings_usd: number;
    sustainability_score: number;
    ai_insight: string;
}

export interface AnalysisResult {
    control_id: string;
    status: string;
    implementation_statement: string;
    analysis_confidence: number;
}

export interface SimulationResult {
    estimated_emissions_reduction_kg: number;
    estimated_cost_savings_usd: number;
    risk_summary: string;
    detail_summary: string;
}

const API_BASE = "http://localhost:8000/api";

export async function fetchOverview(): Promise<OverviewData> {
    const res = await fetch(`${API_BASE}/overview`);
    if (!res.ok) throw new Error("Failed to fetch overview");
    return res.json();
}

export async function fetchComplianceControls(): Promise<Control[]> {
    const res = await fetch(`${API_BASE}/compliance/controls`);
    if (!res.ok) throw new Error("Failed to fetch controls");
    return res.json();
}

export async function analyzeControl(controlId: string): Promise<AnalysisResult> {
    const res = await fetch(`${API_BASE}/compliance/controls/${controlId}/analysis`, {
        method: "POST",
    });
    if (!res.ok) throw new Error("Failed to analyze control");
    return res.json();
}

export async function fetchSustainabilityMetrics(): Promise<SustainabilityMetrics> {
    const res = await fetch(`${API_BASE}/sustainability/metrics`);
    if (!res.ok) throw new Error("Failed to fetch sustainability metrics");
    return res.json();
}

export async function runSimulation(payload: {
    simulation_type: string;
    source_region?: string;
    target_region?: string;
    workload_percent: number;
}): Promise<SimulationResult> {
    const res = await fetch(`${API_BASE}/simulations/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to run simulation");
    return res.json();
}
