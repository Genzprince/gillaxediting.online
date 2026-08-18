import type { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";

export interface VercelRequest extends IncomingMessage {
  body: any;
  query: Record<string, string | string[]>;
  cookies: Record<string, string>;
}

export interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  send: (body: any) => VercelResponse;
}

const PROJECTS_FILE = path.join(process.cwd(), "public", "data", "projects.json");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
      return res.json(JSON.parse(data));
    } catch (err) {
      console.error("GET /api/projects error:", err);
      return res.status(500).json({ error: "Could not read projects." });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
