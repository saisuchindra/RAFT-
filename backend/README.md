# AtlasKV

AtlasKV is an educational distributed key-value store built from scratch in phases.

This repository currently contains **Phase 1: Single-node key-value store**.

## What Phase 1 Includes

- `SET key value`
- `GET key`
- `DELETE key`
- FastAPI HTTP endpoints
- In-memory storage using a Python dictionary
- Automated tests
- CORS support for the React frontend at `http://127.0.0.1:5173`
- `GET /keys` helper endpoint so the frontend can display stored keys

There is no Raft consensus in Phase 1 yet. This phase creates the simple storage engine and API that later Raft phases will replicate across multiple nodes.

## Project Structure

```text
backend/
├── api/
│   ├── __init__.py
│   ├── models.py
│   └── routes.py
├── config/
│   └── __init__.py
├── networking/
│   └── __init__.py
├── raft/
│   └── __init__.py
├── storage/
│   ├── __init__.py
│   └── memory_store.py
├── tests/
│   └── test_kv_api.py
├── main.py
├── requirements.txt
└── README.md
```

## Install

Open a terminal in the project root:

```powershell
cd c:\Users\suchindra\Downloads\RAFT\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## Run

From the `backend` folder, start the API server:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Open this URL in your browser:

```text
http://127.0.0.1:8000/docs
```

FastAPI will show an interactive API page where you can try the endpoints.

## API Endpoints

### SET a key

```http
POST /set
```

Request body:

```json
{
  "key": "language",
  "value": "python"
}
```

### GET a key

```http
GET /get/language
```

### DELETE a key

```http
DELETE /delete/language
```

### LIST all keys

```http
GET /keys
```

## Test With PowerShell

Start the server first, then open another terminal and run:

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/set -ContentType "application/json" -Body '{"key":"language","value":"python"}'
Invoke-RestMethod -Method Get -Uri http://127.0.0.1:8000/get/language
Invoke-RestMethod -Method Delete -Uri http://127.0.0.1:8000/delete/language
```

## Run Automated Tests

From the `backend` folder:

```powershell
pytest
```

Expected result:

```text
4 passed
```
