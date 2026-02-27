# Tabish's Notes

A minimal, full-stack markdown notes app with a warm, Notion-inspired aesthetic. Write, search, and manage your thoughts cleanly.

<br />

## Screenshots

| Login | Dashboard |
|---|---|
| ![Login](./screenshots/login.png) | ![Dashboard](./screenshots/home.png) |

<br />

## Features

- **JWT Authentication** — Secure signup & login with hashed passwords via bcryptjs
- **Note Management** — Create, edit, and delete markdown-based notes
- **Live Search** — Debounced real-time search across all your notes
- **Persistent Sessions** — Token stored in localStorage, session restored on refresh
- **Responsive Design** — Clean layout that works on any screen size

<br />

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, Axios, React Router v7 |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT, bcryptjs |
| Deployment | Vercel (frontend + backend, separate projects) |

<br />

## Project Structure

```
Markdown-Content-Manager/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # User & Note schemas
│   ├── routes/          # /api/users, /api/notes
│   └── server.js
├── frontend/
│   ├── public/          # favicon
│   └── src/
│       └── components/  # Navbar, Home, Login, Register, NoteModal
├── vercel.json          # Backend serverless config
└── package.json
```

<br />

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/tabish-core/Markdown-Content-Manager.git
cd Markdown-Content-Manager
```

### 2. Install dependencies

```bash
# Root (backend)
npm install

# Frontend
cd frontend && npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
```

### 4. Run locally

```bash
# Start backend (from root)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

Frontend → `http://localhost:5173`  
Backend → `http://localhost:5000`

<br />

## Deployment (Vercel)

This app is deployed as two separate Vercel projects.

### Backend

- Import repo → set **Root Directory** to `./` (root)
- Framework: **Other**
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `FRONTEND_URL`

### Frontend

- Import repo → set **Root Directory** to `frontend`
- Framework: **Vite**
- Environment variables: `VITE_API_URL=https://your-backend.vercel.app`

<br />

## License

MIT