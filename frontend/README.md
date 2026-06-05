# AtlasKV Frontend

This is the React dashboard for AtlasKV, an educational distributed key-value store powered by the Raft consensus algorithm.

This frontend currently contains a connected Phase 1 UI for the single-node AtlasKV backend.

## What Phase 1 Includes

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios API client
- React Query provider
- Recharts dependency ready for later charts
- Sidebar navigation
- Top navigation
- Responsive layout
- Pages for Dashboard, Cluster, KV Store, Logs, and Settings
- Live backend connection status
- Working SET, GET, and DELETE forms
- Live stored-key table powered by the backend `/keys` endpoint

The live Raft cluster screens are intentionally not implemented yet. They will be built in later frontend phases after the backend exposes leader election, log replication, and cluster-health APIs.

## Project Structure

```text
frontend/
├── public/
│   └── atlaskv-mark.svg
├── src/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── test/
│   ├── types/
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

## Install

Open a terminal in the frontend folder:

```powershell
cd c:\Users\suchindra\Downloads\RAFT\frontend
npm install
```

## Run

Start the backend first:

```powershell
cd c:\Users\suchindra\Downloads\RAFT\backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Then open another terminal and start the frontend development server:

```powershell
cd c:\Users\suchindra\Downloads\RAFT\frontend
npm run dev
```

Open this URL in your browser:

```text
http://127.0.0.1:5173
```

Use the **KV Store** page to save, read, and delete keys through the backend.

## Configure Backend URL

By default, the frontend expects the backend at:

```text
http://127.0.0.1:8000
```

To use a different backend URL, create a `.env` file in the `frontend` folder:

```text
VITE_ATLASKV_API_URL=http://127.0.0.1:8000
```

## Test

Run the automated frontend tests:

```powershell
npm run test
```

Expected result:

```text
Test Files  1 passed
Tests       2 passed
```

## Build

Run a production build:

```powershell
npm run build
```

Expected result:

```text
✓ built
```
