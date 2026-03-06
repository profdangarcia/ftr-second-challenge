import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPaths, isDev } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_DEV_URL = "http://localhost:5173";

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

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
