import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, type ChildProcess } from "node:child_process";
import { getPaths, isDev } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_DEV_URL = "http://localhost:5173";
const BACKEND_PORT = "4000";

let backendProcess: ChildProcess | null = null;

function runMigrations(): Promise<void> {
  const { backendPath } = getPaths(__dirname);
  const databasePath = path.join(app.getPath("userData"), "financy.db");
  const databaseUrl = `file:${databasePath}`;
  const prismaCli = path.join(backendPath, "node_modules", "prisma", "build", "index.js");

  return new Promise((resolve, reject) => {
    const proc = spawn(process.execPath, [prismaCli, "migrate", "deploy"], {
      cwd: backendPath,
      env: { ...process.env, DATABASE_URL: databaseUrl },
      stdio: "pipe",
    });
    proc.on("error", reject);
    proc.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`prisma migrate exit ${code}`))));
  });
}

function startBackend(): Promise<void> {
  const { backendPath } = getPaths(__dirname);
  const entryPath = path.join(backendPath, "dist", "src", "index.js");
  const databasePath = path.join(app.getPath("userData"), "financy.db");
  const databaseUrl = `file:${databasePath}`;

  return new Promise((resolve, reject) => {
    backendProcess = spawn(process.execPath, [entryPath], {
      cwd: backendPath,
      env: {
        ...process.env,
        PORT: BACKEND_PORT,
        DATABASE_URL: databaseUrl,
      },
      stdio: "pipe",
    });

    backendProcess.on("error", reject);
    backendProcess.stdout?.on("data", (data) => process.stdout.write(data));
    backendProcess.stderr?.on("data", (data) => process.stderr.write(data));

    const timeout = setTimeout(() => resolve(), 2000);
    backendProcess.on("exit", (code) => {
      clearTimeout(timeout);
      if (code !== 0 && code !== null) reject(new Error(`Backend exited with code ${code}`));
    });
  });
}

function killBackend(): void {
  if (backendProcess && !backendProcess.killed) {
    backendProcess.kill();
    backendProcess = null;
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
    win.webContents.openDevTools();
  } else {
    const { frontendDistPath } = getPaths(__dirname);
    const indexHtml = path.join(frontendDistPath, "index.html");
    win.loadFile(indexHtml);
  }
}

app.whenReady().then(async () => {
  if (app.isPackaged) {
    await runMigrations();
    await startBackend();
  }
  createWindow();
});

app.on("window-all-closed", () => {
  killBackend();
  app.quit();
});

app.on("before-quit", () => {
  killBackend();
});
