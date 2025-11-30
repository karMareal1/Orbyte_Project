from google.cloud import bigquery
from models.schemas import Control, Resource, ControlSeverity, ControlStatus
from typing import List
import os

# Configuration
PROJECT_ID = os.getenv("GCP_PROJECT_ID", "orbyteprototype")
DATASET_ID = os.getenv("BQ_DATASET_ID", "orbyte")

# Initialize Client
try:
    client = bigquery.Client(project=PROJECT_ID)
except Exception as e:
    print(f"Error initializing BigQuery client: {e}")
    client = None

def get_controls_from_bq() -> List[Control]:
    if not client:
        return []
    
    query = f"""
    SELECT 
        control_id, name, framework, severity, status, evidence_count, description
    FROM `{PROJECT_ID}.{DATASET_ID}.controls_view`
    """
    
    try:
        query_job = client.query(query)
        results = []
        for row in query_job:
            # Map string values to Enums safely
            try:
                severity = ControlSeverity(row.severity.lower())
            except ValueError:
                severity = ControlSeverity.LOW
                
            try:
                status = ControlStatus(row.status.lower())
            except ValueError:
                status = ControlStatus.AT_RISK

            results.append(Control(
                id=row.control_id,
                name=row.name,
                framework=row.framework,
                severity=severity,
                status=status,
                evidence_count=row.evidence_count,
                description=row.description
            ))
        return results
    except Exception as e:
        print(f"BigQuery error fetching controls: {e}")
        return []

def get_resources_from_bq() -> List[Resource]:
    if not client:
        return []

    query = f"""
    SELECT
        resource_id, name, type, region, instance_type, 
        avg_cpu_7d, avg_hours_per_day, last_active_days_ago, daily_cost_usd
    FROM `{PROJECT_ID}.{DATASET_ID}.resources_view`
    """
    
    try:
        query_job = client.query(query)
        results = []
        for row in query_job:
            results.append(Resource(
                id=row.resource_id,
                name=row.name,
                type=row.type,
                region=row.region,
                instance_type=row.instance_type,
                avg_cpu_7d=row.avg_cpu_7d,
                avg_hours_per_day=row.avg_hours_per_day,
                last_active_days_ago=row.last_active_days_ago,
                daily_cost_usd=row.daily_cost_usd
            ))
        return results
    except Exception as e:
        print(f"BigQuery error fetching resources: {e}")
        return []
