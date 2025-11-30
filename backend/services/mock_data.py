from models.schemas import Control, Resource, ControlSeverity, ControlStatus
from datetime import datetime, timedelta

def get_mock_controls():
    return [
        Control(
            id="AC-2",
            name="Account Management",
            framework="NIST 800-53",
            severity=ControlSeverity.CRITICAL,
            status=ControlStatus.PASS,
            evidence_count=5,
            description="The organization identifies and selects the following types of information system accounts to support organizational missions/business functions."
        ),
        Control(
            id="AC-3",
            name="Access Enforcement",
            framework="NIST 800-53",
            severity=ControlSeverity.HIGH,
            status=ControlStatus.FAIL,
            evidence_count=2,
            description="The information system enforces approved authorizations for logical access to information and system resources in accordance with applicable access control policies."
        ),
        Control(
            id="CC-6",
            name="Logical and Physical Access",
            framework="SOC 2",
            severity=ControlSeverity.HIGH,
            status=ControlStatus.AT_RISK,
            evidence_count=3,
            description="Logical access to relevant system components is restricted to authorized personnel."
        ),
        Control(
            id="CC-7",
            name="System Operations",
            framework="SOC 2",
            severity=ControlSeverity.MEDIUM,
            status=ControlStatus.PASS,
            evidence_count=8,
            description="System operations are managed to maintain the security and availability of the system."
        )
    ]

def get_mock_resources():
    now = datetime.now()
    return [
        Resource(
            id="vm-1",
            name="prod-web-01",
            type="vm",
            region="us-central1",
            instance_type="n1-standard-4",
            avg_cpu_7d=0.45,
            avg_hours_per_day=24.0,
            last_active_days_ago=0,
            last_active_at=now,
            daily_cost_usd=12.50
        ),
        Resource(
            id="vm-2",
            name="dev-test-01",
            type="vm",
            region="us-central1",
            instance_type="n1-standard-1",
            avg_cpu_7d=0.02,
            avg_hours_per_day=24.0,
            last_active_days_ago=5,
            last_active_at=now - timedelta(days=5),
            daily_cost_usd=3.20
        ),
        Resource(
            id="vm-3",
            name="staging-db",
            type="db",
            region="europe-west4",
            instance_type="n1-highcpu-32",
            avg_cpu_7d=0.10,
            avg_hours_per_day=8.0,
            last_active_days_ago=0,
            last_active_at=now,
            daily_cost_usd=45.00
        ),
        Resource(
            id="vm-4",
            name="old-batch-job",
            type="vm",
            region="us-west1",
            instance_type="n1-standard-4",
            avg_cpu_7d=0.01,
            avg_hours_per_day=24.0,
            last_active_days_ago=10,
            last_active_at=now - timedelta(days=10),
            daily_cost_usd=12.50
        )
    ]
