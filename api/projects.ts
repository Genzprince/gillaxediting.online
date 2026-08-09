import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "prince2026";
const PROJECTS_FILE = path.join(process.cwd(), "public", "data", "projects.json");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-password");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
      return res.json(JSON.parse(data));
    } catch (err) {
      console.error("Failed to read projects.json:", err);
      return res.status(500).json({ error: "Could not read projects." });
    }
  }

  if (req.method === "PUT") {
    const auth = req.headers["x-admin-password"];
    if (auth !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(req.body, null, 2), "utf-8");
      return res.json({ success: true });
    } catch (err: any) {
      console.error("Failed to write projects.json:", err);
      return res.status(500).json({ error: "Could not save projects." });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
