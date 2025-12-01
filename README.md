# 🌐 Orbyte - AI-Powered Cloud Compliance & Sustainability Platform

> **Orchestrated Byte Environment**: An intelligent copilot that automates cloud compliance monitoring and sustainability optimization for Google Cloud Platform.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![GCP](https://img.shields.io/badge/GCP-Vertex%20AI%20%2B%20BigQuery-orange)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Orbyte** is a next-generation SaaS platform that combines AI-powered insights with real-time cloud monitoring to help organizations:

- **Automate Compliance**: Track and analyze security controls across NIST 800-53, SOC 2, and ISO 27001 frameworks
- **Optimize Sustainability**: Monitor carbon emissions, identify idle resources, and forecast environmental impact
- **Simulate Scenarios**: Run "what-if" analyses to predict the impact of infrastructure changes before implementation

Built with **Google Cloud Vertex AI (Gemini)** for intelligent reasoning and **BigQuery** for scalable data analytics, Orbyte transforms raw telemetry into actionable insights.

---

## ✨ Key Features

### 🛡️ Compliance Automation
- **Multi-Framework Support**: NIST 800-53, SOC 2 Type II, ISO 27001
- **AI-Generated Implementation Statements**: Gemini analyzes evidence and produces auditor-ready documentation
- **Real-Time Risk Monitoring**: Weighted scoring by control severity (Critical, High, Medium, Low)
- **Evidence Tracking**: Automated collection and analysis of configuration, logs, and policies

### 🌱 Sustainability Intelligence
- **Carbon Footprint Tracking**: Estimate emissions by region, resource type, and usage patterns
- **Idle Resource Detection**: Identify underutilized VMs, databases, and storage (CPU < 5%, inactive > 3 days)
- **Cost-Emission Correlation**: Visualize the relationship between cloud spend and environmental impact
- **AI-Powered Recommendations**: Gemini suggests specific actions to reduce emissions and costs

### 🔮 Scenario Simulation
- **Idle Shutdown Forecasting**: Predict savings from scheduling off-hours shutdowns
- **Region Migration Analysis**: Compare emissions and costs across GCP regions
- **Risk Assessment**: AI-generated summaries of operational risks for each scenario

### 🎨 Modern UI/UX
- **Futuristic Dashboard**: Dark theme with glassmorphism, neon accents, and smooth animations
- **Real-Time Charts**: Interactive compliance and emissions trends using Recharts
- **AI Thinking Indicators**: Visual feedback during Vertex AI processing
- **Responsive Design**: Optimized for desktop and mobile

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Overview │  │Compliance│  │Sustainab.│  │Simulation│   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                         │                                   │
│                    REST API (JSON)                          │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                  Backend (FastAPI)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Endpoints                           │   │
│  │  /api/overview | /api/compliance/* | /api/sustain/* │   │
│  └────────────────┬─────────────────────────────────────┘   │
│                   │                                          │
│  ┌────────────────▼──────────────┐  ┌────────────────────┐  │
│  │    BigQuery Service           │  │  AI Reasoning      │  │
│  │  ┌─────────────────────────┐  │  │  (Vertex AI)       │  │
│  │  │ controls_view           │  │  │  ┌──────────────┐  │  │
│  │  │ resources_view          │  │  │  │ Gemini 2.0   │  │  │
│  │  │ emissions_daily         │  │  │  │ Flash        │  │  │
│  │  └─────────────────────────┘  │  │  └──────────────┘  │  │
│  └───────────┬───────────────────┘  └──────────┬─────────┘  │
│              │                                  │            │
│              ▼                                  ▼            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Metrics Engine                          │   │
│  │  • Compliance Scoring  • Emissions Calculation       │   │
│  │  • Idle Detection      • Sustainability Scoring      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Cloud Platform                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  BigQuery    │  │  Vertex AI   │  │ Cloud        │      │
│  │  (Data Lake) │  │  (Gemini)    │  │ Monitoring   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.13)
- **AI/ML**: Google Cloud Vertex AI (Gemini 2.0 Flash)
- **Database**: Google BigQuery
- **Data Validation**: Pydantic
- **Environment**: python-dotenv

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide Icons
- **Charts**: Recharts
- **Authentication**: NextAuth.js (Google OAuth)

### Infrastructure
- **Cloud Provider**: Google Cloud Platform
- **CI/CD**: GitHub Actions (planned)
- **Monitoring**: Cloud Logging, Cloud Trace

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** (3.13 recommended)
- **Node.js 18+** (20 LTS recommended)
- **npm** or **yarn**
- **Google Cloud Account** with:
  - Vertex AI API enabled
  - BigQuery API enabled
  - Service account with appropriate permissions

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/karMareal1/Orbyte_Project.git
cd Orbyte_Project
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory (or set environment variables):

```env
# GCP Configuration
GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your-service-account.json"
GCP_PROJECT_ID="your-project-id"
GCP_LOCATION="us-central1"

# Vertex AI
VERTEX_MODEL_NAME="gemini-2.0-flash-exp"
ORBYTE_USE_MOCK_AI="false"  # Set to "true" to use mock AI responses

# BigQuery
BQ_DATASET_ID="orbyte"
```

**Note**: The `.env` file is gitignored for security. Never commit credentials to version control.

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Google OAuth (for authentication)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key"
```

### GCP Service Account Setup

1. Go to [GCP Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin > Service Accounts**
3. Create a new service account with these roles:
   - `BigQuery Data Viewer`
   - `BigQuery Job User`
   - `Vertex AI User`
4. Generate a JSON key and download it
5. Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of this JSON file

---

## 🏃 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend

# Set environment variables (Windows PowerShell)
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account.json"
$env:GCP_PROJECT_ID="your-project-id"
$env:GCP_LOCATION="us-central1"

# Start backend
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Use the Convenience Script (Windows)

```powershell
.\start-dev.ps1
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs

---

## 📚 API Documentation

### Core Endpoints

#### `GET /api/overview`
Returns dashboard metrics including compliance score, sustainability score, trends, and top issues.

**Response:**
```json
{
  "compliance_score": 87.5,
  "sustainability_score": 79.2,
  "open_risks": 12,
  "framework_scores": {
    "NIST 800-53": 92.3,
    "SOC 2": 85.1
  },
  "compliance_trend": [...],
  "emissions_trend": [...],
  "top_issues": [...]
}
```

#### `GET /api/compliance/controls`
Returns list of all compliance controls.

#### `POST /api/compliance/controls/{control_id}/analysis`
Triggers AI analysis for a specific control. Returns Gemini-generated implementation statement.

**Response:**
```json
{
  "control_id": "AC-2",
  "status": "pass",
  "implementation_statement": "For control AC-2 (Account Management), analysis of IAM policies...",
  "analysis_confidence": 0.95
}
```

#### `GET /api/sustainability/metrics`
Returns emissions data, idle resources, and AI-generated sustainability insights.

#### `POST /api/simulations/run`
Runs a scenario simulation (idle shutdown or region migration).

**Request:**
```json
{
  "simulation_type": "idle_shutdown",
  "workload_percent": 70,
  "source_region": null,
  "target_region": null
}
```

**Response:**
```json
{
  "estimated_emissions_reduction_kg": 1500.0,
  "estimated_cost_savings_usd": 400.0,
  "risk_summary": "Low risk: only idle non-production resources affected.",
  "detail_summary": "Simulating shutdown of 7 idle resources yields ~1500 kg CO2e..."
}
```

---

## 📁 Project Structure

```
Orbyte_Project/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py          # Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_reasoning.py     # Vertex AI integration
│   │   ├── bigquery_service.py # BigQuery client
│   │   ├── metrics_engine.py   # Compliance & sustainability calculations
│   │   └── mock_data.py        # Fallback data
│   ├── main.py                 # FastAPI app & endpoints
│   ├── requirements.txt
│   └── .env                    # Environment variables (gitignored)
│
├── frontend/
│   ├── app/
│   │   ├── app/                # Protected console routes
│   │   │   ├── overview/
│   │   │   ├── compliance/
│   │   │   ├── sustainability/
│   │   │   ├── scenario-simulation/
│   │   │   └── layout.tsx
│   │   ├── api/                # API routes (NextAuth)
│   │   ├── login/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # Radix UI components
│   │   ├── console-sidebar.tsx
│   │   └── stat-card.tsx
│   ├── lib/
│   │   └── api.ts              # Backend API client
│   ├── package.json
│   └── .env.local              # Environment variables (gitignored)
│
├── .gitignore
├── README.md
├── GCP_INTEGRATION_COMPLETE.md
└── start-dev.ps1               # Development startup script
```

---

## 🧠 How It Works

### 1. Data Collection (BigQuery)
- Cloud resources and compliance evidence are stored in BigQuery views
- Views aggregate data from Cloud Asset Inventory, Cloud Logging, and custom telemetry

### 2. Metrics Processing (Python)
- **Compliance Scoring**: Weighted by severity (Critical=5, High=3, Medium=2, Low=1)
- **Emissions Calculation**: `hours × power_kw × grid_intensity × PUE`
- **Idle Detection**: Resources with `avg_cpu_7d < 0.05` and `last_active > 3 days`

### 3. AI Reasoning (Vertex AI)
- Gemini analyzes structured data and generates natural language insights
- Prompts are engineered for compliance, sustainability, and simulation contexts
- Responses are validated and formatted for the frontend

### 4. Frontend Visualization (Next.js)
- React components fetch data from FastAPI endpoints
- Charts render trends using Recharts
- AI "thinking" indicators provide feedback during Vertex AI processing

### 5. Fallback Logic
- If BigQuery is unavailable → Use mock data
- If Vertex AI fails → Use template-based responses
- System never crashes, always returns valid data

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run E2E tests (Playwright)
npm run test:e2e
```

### Manual Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads landing page
- [ ] Google OAuth login works
- [ ] Overview page displays metrics
- [ ] Compliance page shows controls
- [ ] Clicking a control triggers AI analysis
- [ ] Sustainability page shows emissions data
- [ ] Scenario simulation returns results
- [ ] Fallback to mock data works when BigQuery is disabled

---

## 🚢 Deployment

### Backend (Google Cloud Run)

```bash
cd backend

# Build container
gcloud builds submit --tag gcr.io/your-project-id/orbyte-backend

# Deploy to Cloud Run
gcloud run deploy orbyte-backend \
  --image gcr.io/your-project-id/orbyte-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Frontend (Vercel)

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables**: Set all `.env.local` variables in Vercel dashboard.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- **Backend**: Follow PEP 8 (enforced by `black` and `flake8`)
- **Frontend**: Follow Airbnb JavaScript Style Guide (enforced by ESLint)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Cloud Platform** for Vertex AI and BigQuery
- **Vercel** for Next.js framework and hosting
- **FastAPI** for the modern Python web framework
- **Radix UI** for accessible component primitives

---

## 📞 Support

For questions or issues:
- **GitHub Issues**: [Create an issue](https://github.com/karMareal1/Orbyte_Project/issues)
- **Email**: support@orbyte.io (placeholder)
- **Documentation**: See `GCP_INTEGRATION_COMPLETE.md` for detailed setup

---

**Built with ❤️ by the Orbyte Team**

*Making cloud compliance and sustainability accessible to everyone.*
