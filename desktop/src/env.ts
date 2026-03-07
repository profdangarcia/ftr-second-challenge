import { app } from "electron";
import path from "node:path";

/**
 * Paths relative to the Electron main process.
 * mainDirname should be the __dirname of main (e.g. desktop/dist or app.asar/dist).
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
