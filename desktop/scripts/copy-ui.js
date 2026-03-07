import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const frontendDist = path.join(root, "frontend", "dist");
const target = path.join(__dirname, "..", "frontend-dist");

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(frontendDist, target, { recursive: true });
console.log("Copied frontend/dist -> desktop/frontend-dist");
