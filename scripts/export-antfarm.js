#!/usr/bin/env node
// Exports Antfarm workflow state to JSON for the Vercel dashboard
// Run: node scripts/export-antfarm.js

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "data", "antfarm.json");
const antfarmCli = path.join(process.env.HOME, ".openclaw/workspace/antfarm/dist/cli/cli.js");

try {
  // Get workflow list
  const listOut = execSync(`node ${antfarmCli} workflow list --json 2>/dev/null || echo "[]"`, { encoding: "utf-8" }).trim();
  
  // Get recent runs status
  let runs = [];
  try {
    const statusOut = execSync(`node ${antfarmCli} logs --json 2>/dev/null || echo "[]"`, { encoding: "utf-8" }).trim();
    runs = JSON.parse(statusOut);
  } catch { runs = []; }

  const data = {
    lastExported: new Date().toISOString(),
    workflows: ["feature-dev", "bug-fix", "security-audit"],
    runs: Array.isArray(runs) ? runs : []
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log("Exported antfarm state to", outPath);
} catch (e) {
  // Write empty state so dashboard doesn't break
  const data = { lastExported: new Date().toISOString(), workflows: ["feature-dev", "bug-fix", "security-audit"], runs: [] };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log("Exported empty antfarm state (no runs yet)");
}
