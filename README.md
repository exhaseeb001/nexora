# NEXORA — Realtime Analytics SaaS

A complete full-stack demo: a React + TypeScript + Tailwind CSS + shadcn/ui frontend
with GSAP animations and a Three.js hero, backed by a real Express + TypeScript REST API
on SQLite.

```
nexora/
  frontend/   # React SPA (Vite). Deployed to GitHub Pages.
  backend/    # Express REST API (SQLite via node:sqlite). Deploy anywhere Node runs.
```

## Quickstart

**Backend** (http://localhost:4000):

```bash
cd backend
npm install
npm run dev        # seeds the SQLite DB on first boot
```

**Frontend** (http://localhost:5173):

```bash
cd frontend
npm install
npm run dev
```

To point the frontend at a live backend instead of the built-in demo data:

```bash
VITE_API_URL=http://localhost:4000 npm run dev
```

The dashboard header shows a **Live API** / **Demo data** badge so you always know
which transport is active.

## API

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/health` | Service status |
| GET | `/api/stats` | Dashboard stat cards |
| GET | `/api/revenue?days=7\|30` | Revenue time series |
| GET | `/api/channels` | Acquisition channels |
| GET | `/api/highlights` | Report highlights |
| GET | `/api/customers?q=&sort=&dir=` | Searchable, sortable customers |
| GET | `/api/customers/:id` | One customer |
| POST | `/api/customers` | Create (`name`, `email` required) |
| PATCH | `/api/customers/:id` | Update |
| DELETE | `/api/customers/:id` | Delete |

## Deploy

- **Frontend → GitHub Pages:** push to `main` — `.github/workflows/deploy-pages.yml`
  builds `frontend/` and deploys automatically. Set the `VITE_API_URL` repo variable
  to your backend URL to use live data, or leave it empty for the demo build.
  (Repo Settings → Pages → Source: **GitHub Actions**.)
- **Backend → Render:** `render.yaml` is included — create a Web Service from this
  repo on render.com and it builds with `npm install && npm run build`, starting
  with `npm start`.
