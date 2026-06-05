# RAFT - Resilient and Fault-Tolerant Key-Value Store

A modern, distributed key-value store implementation using the RAFT consensus algorithm with a full-stack web application for cluster management and data visualization.

![RAFT Architecture](frontend/public/atlaskv-mark.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Development](#development)
  - [Backend Development](#backend-development)
  - [Frontend Development](#frontend-development)
  - [Running Tests](#running-tests)
- [How It Works](#how-it-works)
  - [RAFT Consensus](#raft-consensus)
  - [Storage Layer](#storage-layer)
  - [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

RAFT is a distributed key-value store that implements the RAFT consensus algorithm to ensure data consistency across multiple nodes in a cluster. The system provides a reliable, fault-tolerant storage solution with automatic leader election and log replication.

This project includes:
- **Backend API**: Flask-based REST API for key-value operations
- **Frontend Dashboard**: React-based web interface for cluster management
- **RAFT Implementation**: Complete consensus algorithm implementation
- **Test Suite**: Comprehensive pytest test cases

## ✨ Features

- **Distributed Consensus**: RAFT algorithm for strong consistency
- **High Availability**: Automatic failover and leader election
- **REST API**: Easy-to-use HTTP endpoints for data operations
- **Web Dashboard**: Real-time cluster monitoring and management
- **In-Memory Storage**: Fast data access with configurable persistence
- **Type-Safe**: Full TypeScript support in frontend
- **Comprehensive Tests**: Unit and integration test coverage

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────┐
│                    Web Dashboard                        │
│              (React + TypeScript + Tailwind)            │
└─────────────────────────────┬───────────────────────────┘
                              │
                         HTTP/REST
                              │
┌─────────────────────────────▼───────────────────────────┐
│                   Backend API (Flask)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │           RAFT Consensus Engine                  │   │
│  │  - Leader Election                              │   │
│  │  - Log Replication                              │   │
│  │  - State Machine                                │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Storage Layer (In-Memory)                │   │
│  │  - Key-Value Store                              │   │
│  │  - Persistence Support                          │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask
- **Language**: Python 3.10+
- **Testing**: pytest
- **Dependencies**: See `backend/requirements.txt`

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **UI Components**: Custom React components

### Infrastructure
- **Database**: In-Memory Storage (extensible to persistent backends)
- **API**: RESTful HTTP
- **Network**: TCP/IP for node communication

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 18+ and npm 9+
- Git

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/saisuchindra/RAFT-.git
cd RAFT
```

#### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install npm dependencies
npm install
```

### Running the Application

#### Start the Backend Server

```bash
cd backend
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
python main.py
```

The backend API will be available at `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Build for Production

**Backend:**
```bash
cd backend
python main.py  # Use production settings
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
RAFT/
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── models.py          # Data models for KV store
│   │   └── routes.py          # API endpoints
│   ├── config/
│   │   └── __init__.py        # Configuration settings
│   ├── networking/
│   │   └── __init__.py        # Network communication
│   ├── raft/
│   │   └── __init__.py        # RAFT consensus implementation
│   ├── storage/
│   │   ├── __init__.py
│   │   └── memory_store.py    # In-memory key-value store
│   ├── tests/
│   │   ├── conftest.py        # Pytest fixtures
│   │   └── test_kv_api.py     # API tests
│   ├── main.py                # Flask application entry point
│   ├── requirements.txt       # Python dependencies
│   ├── pytest.ini             # Pytest configuration
│   └── README.md              # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PageHeader.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopNav.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── PlaceholderPanel.tsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ClusterPage.tsx
│   │   │   ├── KvStorePage.tsx
│   │   │   ├── LogsPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── layouts/
│   │   │   └── AppLayout.tsx
│   │   ├── hooks/
│   │   │   ├── useBackendStatus.ts
│   │   │   ├── useKeyList.ts
│   │   │   └── useNavigationItems.ts
│   │   ├── services/
│   │   │   ├── apiClient.ts
│   │   │   └── backendApi.ts
│   │   ├── types/
│   │   │   ├── api.ts
│   │   │   ├── cluster.ts
│   │   │   └── navigation.ts
│   │   ├── App.tsx            # Main React component
│   │   ├── main.tsx           # Entry point
│   │   └── styles.css         # Global styles
│   ├── public/                # Static assets
│   ├── vite.config.ts         # Vite configuration
│   ├── vitest.config.ts       # Vitest configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── postcss.config.js      # PostCSS configuration
│   ├── tsconfig.json          # TypeScript config
│   ├── package.json           # Node dependencies
│   └── README.md              # Frontend documentation
│
└── README.md                  # This file
```

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Key-Value Store Endpoints

#### Get a Value
```
GET /kv/{key}

Response: 200 OK
{
  "key": "string",
  "value": "string"
}
```

#### Set a Value
```
POST /kv/{key}
Body: {
  "value": "string"
}

Response: 201 Created
{
  "key": "string",
  "value": "string"
}
```

#### Delete a Value
```
DELETE /kv/{key}

Response: 204 No Content
```

#### Get All Keys
```
GET /kv

Response: 200 OK
{
  "keys": ["key1", "key2", ...]
}
```

### Cluster Status Endpoints

#### Get Cluster Status
```
GET /cluster/status

Response: 200 OK
{
  "node_id": "string",
  "state": "leader|follower|candidate",
  "term": number,
  "nodes": [...]
}
```

#### Get Node Information
```
GET /cluster/nodes

Response: 200 OK
{
  "nodes": [
    {
      "node_id": "string",
      "status": "alive|dead",
      "last_heartbeat": "timestamp"
    }
  ]
}
```

## 💡 Usage Examples

### Python Client Example

```python
import requests

BASE_URL = "http://localhost:5000/api"

# Set a key-value pair
response = requests.post(f"{BASE_URL}/kv/mykey", json={"value": "myvalue"})
print(response.json())

# Get a value
response = requests.get(f"{BASE_URL}/kv/mykey")
print(response.json())

# Get all keys
response = requests.get(f"{BASE_URL}/kv")
print(response.json())

# Delete a key
response = requests.delete(f"{BASE_URL}/kv/mykey")
print(response.status_code)
```

### cURL Examples

```bash
# Set a key
curl -X POST http://localhost:5000/api/kv/mykey \
  -H "Content-Type: application/json" \
  -d '{"value": "myvalue"}'

# Get a key
curl http://localhost:5000/api/kv/mykey

# Get all keys
curl http://localhost:5000/api/kv

# Delete a key
curl -X DELETE http://localhost:5000/api/kv/mykey
```

## 🧪 Development

### Backend Development

#### Install Development Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Run Tests
```bash
pytest
```

#### Run Tests with Coverage
```bash
pytest --cov=api --cov=storage --cov=raft
```

#### Run Specific Test File
```bash
pytest tests/test_kv_api.py -v
```

### Frontend Development

#### Start Development Server
```bash
cd frontend
npm run dev
```

#### Run Tests
```bash
npm run test
```

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

#### Running Tests

**Backend Tests:**
```bash
cd backend
pytest -v
```

**Frontend Tests:**
```bash
cd frontend
npm run test
```

## 🔄 How It Works

### RAFT Consensus

RAFT is a consensus algorithm that ensures all nodes in a distributed system agree on a single, consistent state. The algorithm works through:

1. **Leader Election**: Nodes elect a leader that manages log replication
2. **Log Replication**: The leader sends log entries to followers
3. **Safety**: Ensures data consistency and durability

#### Key Components:

- **Terms**: Logical time units to detect stale leaders
- **Log Entries**: Commands replicated across the cluster
- **State Machine**: Applies committed entries to the key-value store

### Storage Layer

The in-memory storage layer provides fast access to key-value pairs with:
- O(1) lookup time using hash tables
- Thread-safe operations
- Support for persistence (extensible)

### API Endpoints

The REST API provides a clean interface to interact with the RAFT cluster:
- Standard HTTP methods (GET, POST, DELETE)
- JSON request/response format
- Proper HTTP status codes

## 📊 Monitoring

The web dashboard provides real-time monitoring of:
- Cluster health and node status
- Key-value store contents
- Node logs and state transitions
- Performance metrics

Access the dashboard at `http://localhost:5173`

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for frontend code
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in main.py or use:
PORT=5001 python main.py
```

**Virtual environment not activating:**
```bash
# Make sure you're in the backend directory
cd backend
python -m venv .venv
```

### Frontend Issues

**Dependencies not installing:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
```bash
npm run dev -- --port 5174
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Suchindra**
- GitHub: [@saisuchindra](https://github.com/saisuchindra)
- Repository: [RAFT-](https://github.com/saisuchindra/RAFT-.git)

## 🙏 Acknowledgments

- RAFT Algorithm: Diego Ongaro and John Ousterhout
- Flask: Armin Ronacher and contributors
- React: Facebook and community contributors
- Tailwind CSS: Adam Wathan and community

## 📞 Support

For issues, questions, or suggestions, please:
1. Open an issue on GitHub
2. Check existing documentation
3. Review test cases for usage examples

---

**Happy coding! 🚀**

*Last Updated: 2026-06-05*
