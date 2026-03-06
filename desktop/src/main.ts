import { app, BrowserWindow, dialog } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, type ChildProcess } from "node:child_process";
import { getPaths, isDev } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_DEV_URL = "http://localhost:5173";
const BACKEND_PORT = "4000";
const BACKEND_KILL_DELAY_MS = 500;

let backendProcess: ChildProcess | null = null;

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

function startBackend(): Promise<void> {
  const { backendPath } = getPaths(__dirname);
  const entryPath = path.join(backendPath, "dist", "src", "index.js");
  const databasePath = path.join(app.getPath("userData"), "financy.db");
  const databaseUrl = `file:${databasePath}`;

  return new Promise((resolve, reject) => {
    backendProcess = spawn("node", [entryPath], {
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
  if (!backendProcess || backendProcess.killed) {
    backendProcess = null;
    return;
  }
  try {
    if (process.platform !== "win32") {
      backendProcess.kill("SIGKILL");
    } else {
      backendProcess.kill();
    }
  } catch {
    backendProcess.kill();
  }
  backendProcess = null;
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
        message: "Falha ao rodar migrações do banco.",
        detail: msg,
      });
    }

    try {
      await startBackend();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Financy] Backend failed to start:", msg);
      await dialog.showMessageBox({
        type: "warning",
        title: "Financy",
        message: "O backend não iniciou. A aplicação pode não funcionar.",
        detail: `Possível causa: porta ${BACKEND_PORT} em uso (feche outras instâncias do app).\n\n${msg}`,
      });
    }
  }

  createWindow();
});

app.on("window-all-closed", () => {
  killBackend();
  app.quit();
});

app.on("before-quit", (event) => {
  killBackend();
  event.preventDefault();
  setTimeout(() => {
    app.exit(0);
  }, BACKEND_KILL_DELAY_MS);
});
