import os
import asyncio
import json
import vertexai
from vertexai.generative_models import GenerativeModel
from dotenv import load_dotenv
from models.schemas import Control, ControlStatus

load_dotenv()

# Ensure credentials helper runs early so vertexai.init can use ADC or a written key
from services.gcp_auth_helper import ensure_credentials
ensure_credentials()

# Configuration
PROJECT_ID = os.getenv("GCP_PROJECT_ID", "orbyteprototype")
LOCATION = os.getenv("GCP_LOCATION", "us-central1")
MODEL_NAME = os.getenv("VERTEX_MODEL_NAME", "gemini-2.5-flash")
USE_MOCK_AI = os.getenv("ORBYTE_USE_MOCK_AI", "false").lower() == "true"

# Initialize Vertex AI
model = None
if not USE_MOCK_AI:
    try:
        vertexai.init(project=PROJECT_ID, location=LOCATION)
        model = GenerativeModel(MODEL_NAME)
        print(f"Vertex AI initialized with project {PROJECT_ID} and model {MODEL_NAME}")
    except Exception as e:
        print(f"Error initializing Vertex AI: {e}")
        print("Falling back to Mock AI mode.")
        model = None

async def generate_implementation_statement(control: Control, evidence: list[dict[str, str]]) -> dict:
    """
    Generates a compliance implementation statement using Vertex AI (or simulation).
    """
    if USE_MOCK_AI or not model:
        return await _generate_mock_implementation_statement(control, evidence)

    evidence_text = "\n".join([f"- {e.get('type', 'evidence')}: {e.get('detail', '')}" for e in evidence])
    
    prompt = f"""
You are Orbyte, an AI cloud compliance copilot.
You write short, auditor-ready implementation statements mapping Google Cloud configurations to compliance controls.
Write in clear, factual, professional English, 2–4 sentences.
Do NOT invent configurations. Only use the evidence you are given.

Control:
- ID: {control.id}
- Name: {control.name}
- Framework: {control.framework}
- Severity: {control.severity}
- Description: {control.description or 'N/A'}

Overall Status: {control.status}

Evidence summary:
{evidence_text}

Task:
1. Explain in 2–4 sentences how this environment currently implements or fails this control.
2. Clearly indicate any gaps or risks if evidence is incomplete.
3. Use "we" to refer to the organization.
"""
    try:
        # Run in a thread to avoid blocking event loop if synchronous
        response = await asyncio.to_thread(model.generate_content, prompt)
        statement = response.text
        confidence = 0.95 
        return {
            "control_id": control.id,
            "status": control.status,
            "implementation_statement": statement,
            "analysis_confidence": confidence
        }
    except Exception as e:
        print(f"Vertex AI call failed: {e}")
        return await _generate_mock_implementation_statement(control, evidence)

async def _generate_mock_implementation_statement(control: Control, evidence: list[dict[str, str]]) -> dict:
    await asyncio.sleep(1.2)
    if control.status == ControlStatus.PASS:
        statement = (
            f"For control {control.id} ({control.name}), analysis of configuration and "
            f"audit logs indicates that required safeguards are in place. "
            f"Evidence confirms compliant settings across {len(evidence)} monitored resources."
        )
    else:
        statement = (
            f"Control {control.id} ({control.name}) is currently {control.status}. "
            f"Evidence suggests potential misconfigurations in {len(evidence)} resources that require remediation."
        )
    confidence = 0.85
    return {
        "control_id": control.id,
        "status": control.status,
        "implementation_statement": statement,
        "analysis_confidence": confidence
    }

def generate_sustainability_insight(total_emissions_kg: float, potential_savings_kg: float, idle_count: int, worst_region: str | None) -> str:
    """
    Generates a sustainability insight.
    """
    if USE_MOCK_AI or not model:
        return _generate_mock_sustainability_insight(total_emissions_kg, potential_savings_kg, idle_count, worst_region)

    prompt = f"""
You are Orbyte, an AI sustainability analyst for cloud environments.
You generate concise, actionable insights about emissions, idle resources, and potential savings.
Your tone is factual and data-driven.

High-level metrics for this organization:
- Total monthly emissions: {total_emissions_kg:.0f} kg CO2e
- Potential monthly emissions savings (idle resources): {potential_savings_kg:.0f} kg CO2e
- Idle resource count: {idle_count}
- Worst emitting region: {worst_region or 'N/A'}

Task:
Write 1–2 sentences summarizing the most impactful action this team can take in the next month to reduce emissions and cost.
Be specific (e.g., "Schedule off-hours shutdown for 12 idle dev VMs in us-central1").
"""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Vertex AI call failed: {e}")
        return _generate_mock_sustainability_insight(total_emissions_kg, potential_savings_kg, idle_count, worst_region)

def _generate_mock_sustainability_insight(total_emissions_kg: float, potential_savings_kg: float, idle_count: int, worst_region: str | None) -> str:
    if idle_count >= 5 and potential_savings_kg > 1000:
        return (
            f"If you schedule shutdowns for {idle_count} idle non-production resources, "
            f"you could reduce monthly emissions by approximately {potential_savings_kg:.0f} kg CO2e."
        )
    elif worst_region:
        return (
            f"Most emissions are concentrated in {worst_region}. "
            "Migrating non-critical workloads to a cleaner region could materially improve your sustainability score."
        )
    else:
        return "Emissions are relatively balanced across regions. Continue monitoring for optimization opportunities."

def generate_scenario_narrative(simulation_type: str, params: dict, emissions_reduction_kg: float, cost_savings_usd: float) -> dict:
    """
    Generates a narrative for a simulation result.
    """
    if USE_MOCK_AI or not model:
        return _generate_mock_scenario_narrative(simulation_type, emissions_reduction_kg, cost_savings_usd)

    prompt = f"""
You are Orbyte, an AI assistant that explains simulated changes to cloud infrastructure.
You take numeric simulation results and translate them into clear, executive-ready summaries.

We just ran a simulation of type "{simulation_type}" with these parameters:
{json.dumps(params, indent=2)}

The computed impact was:
- Estimated emissions reduction: {emissions_reduction_kg:.0f} kg CO2e / month
- Estimated cost savings: ${cost_savings_usd:.0f} / month

Task:
1. Write 1–2 sentences explaining the benefits of this change in business terms.
2. Write 1 short sentence on potential risks or caveats.
Return the response as a JSON object with keys "detail_summary" and "risk_summary".
"""
    try:
        response = model.generate_content(prompt)
        text = response.text
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        
        try:
            data = json.loads(text)
            return {
                "detail_summary": data.get("detail_summary", text),
                "risk_summary": data.get("risk_summary", "Review operational impact before applying.")
            }
        except:
            return {
                "detail_summary": text,
                "risk_summary": "Review operational impact before applying."
            }
    except Exception as e:
        print(f"Vertex AI call failed: {e}")
        return _generate_mock_scenario_narrative(simulation_type, emissions_reduction_kg, cost_savings_usd)

def _generate_mock_scenario_narrative(simulation_type: str, emissions_reduction_kg: float, cost_savings_usd: float) -> dict:
    return {
        "detail_summary": (
            f"Simulating {simulation_type} yields ~{emissions_reduction_kg:.0f} kg CO2e "
            f"and ${cost_savings_usd:.0f}/month savings."
        ),
        "risk_summary": "Low risk: impact limited to non-production resources."
    }
