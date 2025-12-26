import os
from pathlib import Path

def ensure_credentials():
    """Ensure GOOGLE_APPLICATION_CREDENTIALS is set. If raw JSON is provided
    in `GOOGLE_APPLICATION_CREDENTIALS_JSON`, write it to a local file under
    `backend/credentials/` (gitignored) and set `GOOGLE_APPLICATION_CREDENTIALS`.

    This avoids committing keys but allows CI or local dev to provide the
    credential JSON via an environment variable if needed.
    """
    creds_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    creds_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")

    if creds_path:
        p = Path(creds_path)
        if p.exists():
            print(f"Using credentials file from GOOGLE_APPLICATION_CREDENTIALS: {creds_path}")
            return creds_path
        else:
            print(f"GOOGLE_APPLICATION_CREDENTIALS is set but file not found: {creds_path}")

    if creds_json:
        # write to backend/credentials/<random>.json
        base_dir = Path(__file__).resolve().parents[1]
        cred_dir = base_dir / "credentials"
        cred_dir.mkdir(parents=True, exist_ok=True)
        out_path = cred_dir / "google_application_credentials_from_env.json"
        try:
            out_path.write_text(creds_json, encoding="utf-8")
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(out_path)
            print(f"Wrote GOOGLE_APPLICATION_CREDENTIALS JSON to: {out_path}")
            return str(out_path)
        except Exception as e:
            print(f"Failed writing credentials JSON to disk: {e}")

    print("WARNING: No Google credentials found. Set GOOGLE_APPLICATION_CREDENTIALS to a key file path or provide GOOGLE_APPLICATION_CREDENTIALS_JSON.")
    return None
