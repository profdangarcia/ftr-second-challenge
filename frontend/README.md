# Financy – Frontend

Web interface for Financy (React + TypeScript + Vite + Apollo Client + Tailwind).

## How to run

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example file and adjust if needed:

```bash
cp .env.example .env
```

Variable used: `VITE_GRAPHQL_URI` (default: `http://localhost:4000/graphql`). The backend must be running at that endpoint.

### 3. Start the dev server

```bash
npm run dev
```

The app runs at **http://localhost:5173** (or the port shown in the terminal).

### Other commands

- `npm run build` – production build
- `npm run preview` – preview the build
- `npm run lint` – ESLint
