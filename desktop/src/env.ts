import { app } from "electron";
import path from "node:path";

/**
 * Paths relativos ao processo main do Electron.
 * mainDirname deve ser o __dirname do main (ex.: desktop/dist ou app.asar/dist).
 */
export function getPaths(mainDirname: string): {
  backendPath: string;
  frontendDistPath: string;
} {
  if (app.isPackaged) {
    return {
      backendPath: path.join(process.resourcesPath, "backend"),
      frontendDistPath: path.join(mainDirname, "..", "frontend-dist"),
    };
  }
  const repoRoot = path.join(mainDirname, "..", "..");
  return {
    backendPath: path.join(repoRoot, "backend"),
    frontendDistPath: path.join(repoRoot, "frontend", "dist"),
  };
}

export const isDev = !app.isPackaged;
