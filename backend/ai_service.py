import os
import vertexai
from vertexai.generative_models import GenerativeModel
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = os.getenv("GCP_PROJECT_ID")
LOCATION = os.getenv("GCP_LOCATION")
MODEL_NAME = os.getenv("VERTEX_MODEL_NAME")

# Initialize Vertex AI
try:
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    model = GenerativeModel(MODEL_NAME)
    print(f"Vertex AI initialized with project {PROJECT_ID} and model {MODEL_NAME}")
except Exception as e:
    print(f"Error initializing Vertex AI: {e}")
    model = None

def generate_implementation_statement(control_id: str, control_description: str, evidence_summary: str) -> str:
    if not model:
        return "Error: Vertex AI not initialized."
    
    prompt = f"""
    You are an expert cloud compliance auditor.
    Generate a formal implementation statement for the following control:
    
    Control ID: {control_id}
    Description: {control_description}
    
    Based on this evidence:
    {evidence_summary}
    
    The statement should be professional, concise, and directly address how the control is met.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating content: {e}"

def generate_sustainability_insight(metrics: dict) -> str:
    if not model:
        return "Error: Vertex AI not initialized."
    
    prompt = f"""
    You are a cloud sustainability expert.
    Analyze the following emissions and usage metrics:
    
    {metrics}
    
    Provide a concise insight and one actionable recommendation to reduce emissions or waste.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating content: {e}"

def generate_scenario_narrative(params: dict, numeric_results: dict) -> str:
    if not model:
        return "Error: Vertex AI not initialized."
    
    prompt = f"""
    You are a strategic cloud advisor.
    A user is running a simulation with these parameters:
    {params}
    
    The projected numeric results are:
    {numeric_results}
    
    Write a short narrative explaining the impact of this change on both compliance and sustainability.
    Recommend whether they should proceed.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating content: {e}"
