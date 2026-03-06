import path from "node:path";

/**
 * Paths relativos ao processo main do Electron.
 * mainDirname deve ser o __dirname do main (ex.: desktop/dist).
 */
export function getPaths(mainDirname: string): {
  backendPath: string;
  frontendDistPath: string;
} {
  const repoRoot = path.join(mainDirname, "..", "..");
  return {
    backendPath: path.join(repoRoot, "backend"),
    frontendDistPath: path.join(repoRoot, "frontend", "dist"),
  };
}

export const isDev = process.env.NODE_ENV !== "production";
