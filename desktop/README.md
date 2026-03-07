# Financy Desktop

Electron app that opens the Financy frontend in a desktop window. The backend and frontend run **in separate terminals**.

## Prerequisites

- Node.js (version from root [.nvmrc](../.nvmrc): `nvm use`)
- Backend and frontend projects (root folders `backend/` and `frontend/`)
- **Linux / WSL2** – System dependencies for Electron (GTK, etc.):
  ```bash
  sudo apt update && sudo apt install -y libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 libxtst6
  ```

## Development

1. **Terminal 1 – Backend**  
   From the repo root:
   ```bash
   cd backend && npm run dev
   ```
   The backend runs on port 4000.

2. **Terminal 2 – Frontend**  
   From the repo root:
   ```bash
   cd frontend && npm run dev
   ```
   The frontend runs at http://localhost:5173.

3. **Terminal 3 – Desktop**  
   From the repo root:
   ```bash
   cd desktop && npm run dev
   ```
   Electron opens a window loading http://localhost:5173. DevTools open automatically in development mode.

## Scripts

| Script   | Description |
|----------|-------------|
| `npm run dev`   | Compiles the main process and starts Electron (loads the frontend in dev). |
| `npm run build` | Compiles the main process TypeScript to `dist/`. |
| `npm run start` | Starts Electron (use after `npm run build`; for dev prefer `npm run dev`). |
| `npm run build:icon` | Generates PNG icon from the frontend logo for the installer. |
| `npm run build:ui` | Builds the frontend and copies to `frontend-dist/` (for packaging). |
| `npm run copy:ui` | Copies `frontend/dist` to `frontend-dist/` without running the frontend build. |
| `npm run build:backend` | Prepares the compiled backend in `backend-packaged/` (for packaging). |
| `npm run dist` | Full build: icon + frontend + backend + packaging; produces installers in `release/`. |
| `npm run pack` | Same as `dist`, but only the unpacked folder in `release/` (no installer). |
| `npm run release` | Produces installers in `release/` **without** rebuilding icon or frontend (uses existing `frontend-dist/` and `resources/`). |
| `npm run release:dir` | Same as `release`, but only the unpacked folder (for quick tests). |

## Packaging

You can build installable versions of the app (Linux, Windows, macOS) from the `desktop/` folder.

**Prerequisites:** Node.js, working frontend and backend builds.

**Full build** (icon + frontend + backend + installer):

```bash
cd desktop && npm run dist
```

**When the icon and frontend are already ready** (`frontend-dist/` and `resources/icon` exist), use this to build only the backend and release:

```bash
cd desktop && npm run release
```

Installers are generated in **`desktop/release/`**:

- **Linux:** `.deb` and `AppImage`
- **Windows:** NSIS installer (`.exe`)
- **macOS:** `.dmg`

To test the packaged app without installing (unpacked folder):

```bash
cd desktop && npm run pack
```

Or, without rebuilding icon/frontend:

```bash
cd desktop && npm run release:dir
```

The executable will be in `release/linux-unpacked/`, `release/win-unpacked/`, or `release/mac/` depending on the system.

## Structure

- `src/main.ts` – Electron main process (window, backend spawn when packaged).
- `src/env.ts` – Backend and frontend paths (dev vs packaged).
- `dist/` – Output from `tsc` (from `npm run build`).
- `scripts/copy-ui.js` – Copies the frontend build to `frontend-dist/`.
- `scripts/prepare-backend.js` – Assembles the backend into `backend-packaged/`.
- `scripts/build-icon.js` – Generates `resources/icon.png` from the frontend logo.
