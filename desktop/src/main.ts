import { app, BrowserWindow, dialog } from "electron";
import path from "node:path";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import type { Server } from "node:http";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { getPaths, isDev } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_DEV_URL = "http://localhost:5173";
const BACKEND_PORT = 4000;

let backendServer: Server | null = null;

function runMigrations(): Promise<void> {
  const { backendPath } = getPaths(__dirname);
  const databasePath = path.join(app.getPath("userData"), "financy.db");
  const databaseUrl = `file:${databasePath}`;
  const prismaCli = path.join(backendPath, "node_modules", "prisma", "build", "index.js");

  return new Promise((resolve, reject) => {
    const proc = spawn("node", [prismaCli, "migrate", "deploy"], {
      cwd: backendPath,
      env: { ...process.env, DATABASE_URL: databaseUrl },
      stdio: "pipe",
    });
    proc.on("error", reject);
    proc.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`prisma migrate exit ${code}`))));
  });
}

const CONFIG_FILENAME = "financy-config.json";

function getOrCreateJwtSecret(): string {
  const userDataPath = app.getPath("userData");
  const configPath = path.join(userDataPath, CONFIG_FILENAME);
  mkdirSync(userDataPath, { recursive: true });
  if (existsSync(configPath)) {
    try {
      const data = JSON.parse(readFileSync(configPath, "utf-8")) as { jwtSecret?: string };
      if (data.jwtSecret) return data.jwtSecret;
    } catch {
      // invalid file, regenerate
    }
  }
  const jwtSecret = randomBytes(32).toString("hex");
  writeFileSync(configPath, JSON.stringify({ jwtSecret }, null, 0), "utf-8");
  return jwtSecret;
}

async function startBackendInProcess(): Promise<void> {
  const { backendPath } = getPaths(__dirname);
  const entryPath = path.join(backendPath, "dist", "src", "index.js");
  const databasePath = path.join(app.getPath("userData"), "financy.db");
  const databaseUrl = `file:${databasePath}`;

  const prevCwd = process.cwd();
  try {
    process.chdir(backendPath);
    const entryUrl = pathToFileURL(entryPath).href;
    const backend = await import(entryUrl);
    backendServer = await backend.startServer({
      port: BACKEND_PORT,
      databaseUrl,
      emitSchemaFile: false,
      jwtSecret: getOrCreateJwtSecret(),
    });
  } finally {
    process.chdir(prevCwd);
  }
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL(FRONTEND_DEV_URL);
  } else {
    const { frontendDistPath } = getPaths(__dirname);
    const indexHtml = path.join(frontendDistPath, "index.html");
    win.loadFile(indexHtml);
  }
  win.webContents.openDevTools();
}

app.whenReady().then(async () => {
  if (app.isPackaged) {
    try {
      await runMigrations();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Financy] Migrations failed:", msg);
      await dialog.showMessageBox({
        type: "warning",
        title: "Financy",
        message: "Failed to run database migrations.",
        detail: msg,
      });
    }

    try {
      await startBackendInProcess();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Financy] Backend failed to start:", msg);
      await dialog.showMessageBox({
        type: "warning",
        title: "Financy",
        message: "The backend failed to start. The app may not work properly.",
        detail: `Possible cause: port ${BACKEND_PORT} in use (close other app instances).\n\n${msg}`,
      });
    }
  }

  createWindow();
});

app.on("window-all-closed", () => {
  if (backendServer) {
    backendServer.close();
    backendServer = null;
  }
  app.quit();
});

app.on("before-quit", () => {
  if (backendServer) {
    backendServer.close();
    backendServer = null;
  }
});
