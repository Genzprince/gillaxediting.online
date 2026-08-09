import { google } from "googleapis";

// Sheet column headers (must match the exact order in your Google Sheet)
const SHEET_HEADERS = [
  "Video Title",
  "Client Name",
  "Video URL (YouTube / Vimeo / MP4)",
  "Category Filter",
  "Video Duration",
  "Completion Year",
  "Project Description & Retention Concept",
  "Thumbnail Image URL",
  "Portfolio Keywords & Tags",
  "Pin to Top",
  "Featured Video",
  "Recent Work",
];

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1SDaY_cmYv8UPFl2rqUgdvX9ab6D1jRJ6YQTlWg_JXME";
const SHEET_NAME = "Live Content"; // Tab name in your spreadsheet

// Project interface matching the frontend
export interface SheetProject {
  id: string;
  title: string;
  client: string;
  youtubeLink: string;
  youtubeEmbed?: string;
  videoUrl?: string;
  instagramLink?: string;
  category: string;
  duration: string;
  year: string;
  description: string;
  thumbnail: string;
  skills: string[];
  pinned: boolean;
  featured: boolean;
  isRecent: boolean;
  // Fields auto-generated or with defaults
  platform: string;
  result: string;
  role: string;
  challenge: string;
  solution: string;
  projectDate?: string;
}

/**
 * Create an authenticated Google Sheets client using Service Account credentials.
 */
function getAuthClient() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error(
      "Missing GOOGLE_SHEETS_PRIVATE_KEY or GOOGLE_SHEETS_CLIENT_EMAIL environment variables."
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"), // Handle escaped newlines from env vars
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Parse a YouTube/Vimeo/MP4 URL to extract embed URL
 */
function parseVideoUrl(url: string) {
  if (!url) return { youtubeLink: "", youtubeEmbed: "", videoUrl: "" };

  // YouTube matches
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
  );
  const ytShortsMatch = url.match(/youtube\.com\/shorts\/([^"&?\/ ]{11})/i);
  const videoId = ytMatch ? ytMatch[1] : ytShortsMatch ? ytShortsMatch[1] : null;

  if (videoId) {
    return {
      youtubeLink: `https://www.youtube.com/watch?v=${videoId}`,
      youtubeEmbed: `https://www.youtube.com/embed/${videoId}`,
      videoUrl: "",
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/i);
  if (vimeoMatch) {
    return {
      youtubeLink: url,
      youtubeEmbed: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      videoUrl: "",
    };
  }

  // MP4
  if (url.toLowerCase().endsWith(".mp4") || url.toLowerCase().includes(".mp4?")) {
    return { youtubeLink: "", youtubeEmbed: "", videoUrl: url };
  }

  return { youtubeLink: url, youtubeEmbed: "", videoUrl: "" };
}

/**
 * Auto-extract YouTube thumbnail from a video URL
 */
function getYoutubeThumbnail(url: string): string {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
  );
  const ytShortsMatch = url.match(/youtube\.com\/shorts\/([^"&?\/ ]{11})/i);
  const videoId = ytMatch ? ytMatch[1] : ytShortsMatch ? ytShortsMatch[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
}

/**
 * Generate a slug ID from a title
 */
function generateId(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") +
    "-" +
    Math.floor(Math.random() * 10000)
  );
}

/**
 * Detect platform from URL
 */
function detectPlatform(url: string): string {
  if (!url) return "YouTube";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("tiktok.com")) return "TikTok";
  if (url.includes("vimeo.com")) return "Vimeo";
  if (url.includes("youtube.com/shorts") || url.includes("youtu.be")) return "YouTube Shorts";
  return "YouTube";
}

/**
 * Convert a sheet row (array of cell values) into a SheetProject object.
 */
function rowToProject(row: string[]): SheetProject | null {
  const title = (row[0] || "").trim();
  const client = (row[1] || "").trim();

  // Skip empty rows
  if (!title && !client) return null;

  const videoUrl = (row[2] || "").trim();
  const category = (row[3] || "Short Form").trim();
  const duration = (row[4] || "00:30").trim();
  const year = (row[5] || new Date().getFullYear().toString()).trim();
  const description = (row[6] || "").trim();
  let thumbnail = (row[7] || "").trim();
  const tagsStr = (row[8] || "").trim();
  const pinned = (row[9] || "").toUpperCase() === "TRUE";
  const featured = (row[10] || "").toUpperCase() !== "FALSE"; // Default to true
  const isRecent = (row[11] || "").toUpperCase() === "TRUE";

  const parsed = parseVideoUrl(videoUrl);

  // Auto-extract thumbnail from YouTube if not provided
  if (!thumbnail && videoUrl) {
    thumbnail = getYoutubeThumbnail(videoUrl);
  }

  const skills = tagsStr
    ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean)
    : ["Editing", "Storytelling"];

  return {
    id: generateId(title),
    title,
    client,
    youtubeLink: parsed.youtubeLink,
    youtubeEmbed: parsed.youtubeEmbed,
    videoUrl: parsed.videoUrl,
    category,
    duration,
    year,
    description,
    thumbnail,
    skills,
    pinned,
    featured,
    isRecent,
    platform: detectPlatform(videoUrl),
    result: "Portfolio Work",
    role: "Video Editor & Motion Designer",
    challenge:
      "Craft a high-retention video edit that captures audience attention, pacing, and storytelling seamlessly.",
    solution:
      "Constructed a dynamic cut with custom kinetic typography and visual effects to optimize viewer retention.",
  };
}

/**
 * Convert a SheetProject object to a sheet row (array of cell values).
 */
function projectToRow(p: SheetProject): string[] {
  const videoUrl = p.videoUrl || p.youtubeLink || "";
  return [
    p.title || "",
    p.client || "",
    videoUrl,
    p.category || "Short Form",
    p.duration || "00:30",
    p.year || new Date().getFullYear().toString(),
    p.description || "",
    p.thumbnail || "",
    (p.skills || []).join(", "),
    p.pinned ? "TRUE" : "FALSE",
    p.featured !== false ? "TRUE" : "FALSE",
    p.isRecent ? "TRUE" : "FALSE",
  ];
}

/**
 * READ: Fetch all projects from the Google Sheet via the API.
 * Returns an array of SheetProject objects.
 */
export async function readProjectsFromSheet(): Promise<SheetProject[]> {
  const sheets = getAuthClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `'${SHEET_NAME}'!A2:L1000`, // Skip header row, read up to 1000 rows
  });

  const rows = response.data.values || [];
  const projects: SheetProject[] = [];

  for (const row of rows) {
    const project = rowToProject(row);
    if (project) {
      projects.push(project);
    }
  }

  return projects;
}

/**
 * READ via CSV: Fetch all projects from the publicly-shared Google Sheet via CSV export.
 * This does NOT require API auth — only requires the sheet to be "Anyone with the link can view".
 * Used for the public-facing website to avoid API quota limits.
 */
export async function readProjectsFromCSV(): Promise<SheetProject[]> {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
  }

  const csvText = await response.text();
  const lines = csvText.split("\n");

  // Skip header line
  const projects: SheetProject[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line (handles quoted fields with commas)
    const row = parseCSVLine(line);
    const project = rowToProject(row);
    if (project) {
      projects.push(project);
    }
  }

  return projects;
}

/**
 * Parse a single CSV line, handling quoted fields that may contain commas.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        // Check for escaped quote (double quote)
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = false; // End of quoted field
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * WRITE: Replace ALL project rows in the Google Sheet with the provided array.
 * This clears existing data (except the header) and writes fresh rows.
 */
export async function writeProjectsToSheet(projects: SheetProject[]): Promise<void> {
  const sheets = getAuthClient();

  // 1. Clear all data rows (keep the header)
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SHEET_ID,
    range: `'${SHEET_NAME}'!A2:L1000`,
  });

  // 2. Convert projects to rows
  const rows = projects.map(projectToRow);

  if (rows.length === 0) return;

  // 3. Write all rows at once
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `'${SHEET_NAME}'!A2:L${rows.length + 1}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: rows,
    },
  });
}

/**
 * Merge incoming full Project objects (from frontend) with sheet-compatible format.
 * The frontend sends richer objects with more fields; we preserve what the sheet can store,
 * and keep the extra fields in the JSON response.
 */
export function mergeProjectToSheet(frontendProject: any): SheetProject {
  return {
    id: frontendProject.id || generateId(frontendProject.title || "untitled"),
    title: frontendProject.title || "",
    client: frontendProject.client || "",
    youtubeLink: frontendProject.youtubeLink || "",
    youtubeEmbed: frontendProject.youtubeEmbed || "",
    videoUrl: frontendProject.videoUrl || "",
    instagramLink: frontendProject.instagramLink || "",
    category: frontendProject.category || "Short Form",
    duration: frontendProject.duration || "00:30",
    year: frontendProject.year || new Date().getFullYear().toString(),
    description: frontendProject.description || "",
    thumbnail: frontendProject.thumbnail || "",
    skills: frontendProject.skills || [],
    pinned: !!frontendProject.pinned,
    featured: frontendProject.featured !== false,
    isRecent: !!frontendProject.isRecent,
    platform: frontendProject.platform || detectPlatform(frontendProject.youtubeLink || ""),
    result: frontendProject.result || "Portfolio Work",
    role: frontendProject.role || "Video Editor & Motion Designer",
    challenge: frontendProject.challenge || "",
    solution: frontendProject.solution || "",
    projectDate: frontendProject.projectDate || "",
  };
}

export { SHEET_HEADERS, SHEET_ID, SHEET_NAME };
