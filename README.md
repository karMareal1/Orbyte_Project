# Orbyte Project

This project consists of a FastAPI backend and a Next.js frontend.

## Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

## Getting Started

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will start on `http://127.0.0.1:8000`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`.

## Project Structure

- `backend/`: FastAPI application
- `frontend/`: Next.js application
