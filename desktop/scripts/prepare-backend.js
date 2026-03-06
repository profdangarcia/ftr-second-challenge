import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const backendDir = path.join(root, "backend");
const target = path.join(__dirname, "..", "backend-packaged");

execSync("npm run build", { cwd: backendDir, stdio: "inherit" });

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

cpSync(path.join(backendDir, "dist"), path.join(target, "dist"), { recursive: true });
cpSync(path.join(backendDir, "prisma"), path.join(target, "prisma"), { recursive: true });
cpSync(path.join(backendDir, "package.json"), path.join(target, "package.json"));
const lockPath = path.join(backendDir, "package-lock.json");
if (existsSync(lockPath)) cpSync(lockPath, path.join(target, "package-lock.json"));

execSync("npm install --omit=dev", { cwd: target, stdio: "inherit" });

console.log("Prepared backend-packaged");
