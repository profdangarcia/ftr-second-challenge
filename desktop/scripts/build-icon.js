import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const svgPath = path.join(root, "frontend", "public", "logo.svg");
const outDir = path.join(__dirname, "..", "resources");
const outPath = path.join(outDir, "icon.png");

mkdirSync(outDir, { recursive: true });

await sharp(svgPath)
  .resize(1024, 1024)
  .png()
  .toFile(outPath);

console.log("Generated resources/icon.png from frontend/public/logo.svg");
