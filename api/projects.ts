import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

const PROJECTS_FILE = path.join(process.cwd(), "public", "data", "projects.json");
const GOOGLE_APPS_SCRIPT_URL = process.env.VITE_PORTFOLIO_API_URL || "https://script.google.com/macros/s/AKfycbwX560zFwif1yOT1MYp9vCVuM934atvERCNUPmvX4ql55WVSCvFX9LIm095wHJxgnY/exec";

let cachedProjects: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      if (cachedProjects && Date.now() - cacheTimestamp < CACHE_DURATION_MS) {
        return res.json(cachedProjects);
      }
      
      const fetchRes = await fetch(GOOGLE_APPS_SCRIPT_URL);
      if (!fetchRes.ok) throw new Error("Failed to fetch from Google Sheets");
      
      const data = await fetchRes.json();
      cachedProjects = data;
      cacheTimestamp = Date.now();
      
      return res.json(data);
    } catch (err) {
      console.error("GET /api/projects error, falling back:", err);
      if (cachedProjects) return res.json(cachedProjects);
      
      try {
        const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
        return res.json(JSON.parse(data));
      } catch (fallbackErr) {
        console.error("Failed to read fallback projects.json:", fallbackErr);
        return res.status(500).json({ error: "Could not read projects." });
      }
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
