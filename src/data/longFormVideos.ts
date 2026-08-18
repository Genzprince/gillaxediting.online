import { Project } from "../types";

/**
 * ============================================================================
 * 🎬 LONG FORM VIDEO TEMPLATE & MANAGEMENT
 * ============================================================================
 * 
 * Use this file to manage all Long-Form videos (e.g. YouTube documentaries,
 * long commentaries, full analysis videos, client projects > 1 minute).
 * 
 * ----------------------------------------------------------------------------
 * 📋 FIELD SPECIFICATION (What is REQUIRED vs OPTIONAL):
 * ----------------------------------------------------------------------------
 * 
 * [REQUIRED FIELDS]:
 *  - id                (string)  : Unique URL-safe identifier slug. (e.g. "skill-vs-dominance")
 *  - title             (string)  : Display title of the video.
 *  - category          (string)  : Video genre/category. Options include:
 *                                  "Documentary" | "Commercial" | "Gaming" | "Events" | 
 *                                  "Commentary" | "YouTube" | "Motion Graphics" | "Long Form"
 *  - duration          (string)  : Formatted duration in "MM:SS" (e.g. "05:00", "11:42", "14:20").
 *                                  Note: For Long Form, duration should NOT start with "00:".
 *  - youtubeLink       (string)  : Full YouTube video link (watch, share, or embed URL).
 *                                  (e.g. "https://youtu.be/T-dJKvPi4pc" or "https://www.youtube.com/watch?v=...")
 *  - description       (string)  : Summary of the video, project goals, and overview.
 * 
 * [OPTIONAL FIELDS]:
 *  - client            (string)  : Client, creator, or channel name. (e.g. "Basketball Gods", "Tech Creator")
 *  - platform          (string)  : Primary platform (defaults to "YouTube").
 *  - year              (string)  : Release year (e.g. "2024").
 *  - thumbnail         (string)  : Custom cover image URL. If left blank or omitted, the system
 *                                  AUTOMATICALLY extracts the high-resolution maxres YouTube thumbnail!
 *  - youtubeEmbed      (string)  : Custom embed URL. If omitted, auto-generated from youtubeLink.
 *  - videoUrl          (string)  : Direct MP4 or external video URL (for custom video players).
 *  - role              (string)  : Your role in the project. (e.g. "Lead Video Editor & Motion Designer")
 *  - skills            (string[]): Array of tags/skills. (e.g. ["Sports Storytelling", "Motion Graphics", "Sound Design"])
 *  - result            (string)  : Key result/metric stat. (e.g. "40% Higher Retention", "1.2M+ Views")
 *  - challenge         (string)  : Editing/storytelling challenge description (used in Case Study modal).
 *  - solution          (string)  : How you tackled and solved the challenge (used in Case Study modal).
 *  - isRecent          (boolean) : Set to `true` to feature in the "Recent Work" tab. (default: false)
 *  - featured          (boolean) : Set to `true` to display in portfolio showcase. (default: true)
 *  - pinned            (boolean) : Set to `true` to pin to the very top of the grid. (default: false)
 *  - categoryPosition  (number)  : Custom display sort order in category filters (1, 2, 3...).
 *  - recentPosition    (number)  : Custom display sort order in Recent Work tab (1, 2, 3...).
 *  - projectDate       (string)  : Formatted date string (e.g. "2024-06-15").
 * 
 * ----------------------------------------------------------------------------
 * ✂️ COPY-PASTE TEMPLATE (To add a new video, copy and fill this block):
 * ----------------------------------------------------------------------------
 * 
 * {
 *   id: "your-video-slug",
 *   title: "Your Video Title",
 *   client: "Client / Channel Name",
 *   category: "Documentary", // "Documentary" | "Commercial" | "Gaming" | "Events" | "Commentary"
 *   platform: "YouTube",
 *   duration: "08:30", // Format: MM:SS
 *   year: "2024",
 *   youtubeLink: "https://youtu.be/YOUR_VIDEO_ID",
 *   thumbnail: "", // Optional: Leave blank to auto-fetch from YouTube
 *   description: "Detailed description of the project and story...",
 *   role: "Lead Video Editor & Sound Designer",
 *   skills: ["Storytelling", "Motion Graphics", "Sound Design"],
 *   result: "500K+ Views",
 *   challenge: "Describe the narrative or technical challenge...",
 *   solution: "Describe the creative editing workflow and solution...",
 *   isRecent: true,
 *   featured: true,
 *   categoryPosition: 1,
 *   recentPosition: 1
 * },
 * ============================================================================
 */

export const longFormVideos: Project[] = [
  {
    id: "skill-vs-dominance",
    title: "Basketball Analysis Sample — Victor Wembanyama | Skill vs Dominance",
    client: "Basketball Gods",
    category: "Documentary",
    platform: "YouTube",
    duration: "05:00",
    year: "2024",
    youtubeLink: "https://youtu.be/T-dJKvPi4pc",
    thumbnail: "https://img.youtube.com/vi/T-dJKvPi4pc/maxresdefault.jpg",
    description: "Project Goal\nCreate a modern basketball analysis video that feels closer to an ESPN or Netflix sports documentary than a traditional highlight compilation, while demonstrating advanced editing techniques and visual storytelling.",
    role: "Lead Video Editor & Motion Designer",
    skills: ["Sports Storytelling", "Motion Graphics", "Sound Design", "Pacing & Retention"],
    challenge: "Traditional basketball analysis relies on repetitive highlights and static commentary that struggle to maintain viewer engagement.",
    solution: "Reimagined the script as a visual story combining cinematic pacing, basketball telestration, AI-enhanced imagery, custom motion graphics, and dramatic sound design.",
    result: "40% Higher Retention",
    isRecent: true,
    featured: true,
    categoryPosition: 1,
    recentPosition: 1
  },
  {
    id: "anatomy-of-obsession",
    title: "Anatomy of Obsession",
    client: "Cinematic Essayist",
    category: "Documentary",
    platform: "YouTube",
    duration: "14:20",
    year: "2024",
    youtubeLink: "https://www.youtube.com/watch?v=T-dJKvPi4pc",
    thumbnail: "https://img.youtube.com/vi/T-dJKvPi4pc/maxresdefault.jpg",
    description: "A deep-dive psychological essay dissecting the internal mechanics of high-performing artists and creators, built with atmospheric sound design and cinematic pacing.",
    role: "Lead Documentary Editor & Colorist",
    skills: ["Pacing", "Narrative Architecture", "Color Grading", "Sound Design"],
    challenge: "Structuring over 50 hours of raw interview footage and b-roll into a gripping, cohesive three-act documentary structure.",
    solution: "Implemented kinetic text callouts, customized film grain LUTs, and tension-building audio ducking to sustain attention over a 14-minute runtime.",
    result: "1.2M+ Views",
    isRecent: false,
    featured: true,
    categoryPosition: 2,
    recentPosition: 9999
  },
  {
    id: "porsche-poetry",
    title: "Porsche Poetry: Speed & Grace",
    client: "Automotive Brand",
    category: "Commercial",
    platform: "YouTube",
    duration: "03:15",
    year: "2024",
    youtubeLink: "https://www.youtube.com/watch?v=T-dJKvPi4pc",
    thumbnail: "https://img.youtube.com/vi/T-dJKvPi4pc/maxresdefault.jpg",
    description: "A high-octane luxury automotive commercial blending speed ramps, engine acoustics, and neon color grading for maximum adrenaline.",
    role: "Commercial Editor & Sound Architect",
    skills: ["Speed Ramping", "Sound Design", "Automotive Grading", "Visual Rhythm"],
    challenge: "Creating a visceral sense of speed and elegance without inducing visual fatigue in the viewer.",
    solution: "Choreographed high-frequency engine revs to low-end sub-bass drops and micro-matched cuts to tire squeals and drift transitions.",
    result: "Brand Campaign Winner",
    isRecent: false,
    featured: true,
    categoryPosition: 3,
    recentPosition: 9999
  },
  {
    id: "horizon-paradox",
    title: "Horizon Paradox",
    client: "Gaming Studios",
    category: "Gaming",
    platform: "YouTube",
    duration: "08:45",
    year: "2024",
    youtubeLink: "https://www.youtube.com/watch?v=T-dJKvPi4pc",
    thumbnail: "https://img.youtube.com/vi/T-dJKvPi4pc/maxresdefault.jpg",
    description: "Cinematic narrative trailer and gameplay documentary for next-gen sci-fi open-world game launch.",
    role: "Trailer Editor & VFX Compositor",
    skills: ["Cinematic Gameplay", "VFX Compositing", "Audio Ducking", "Pacing"],
    challenge: "Capturing in-engine gameplay that matched the cinematic fidelity and emotional weight of pre-rendered cutscenes.",
    solution: "Color-balanced game captures, layered custom particle overlays, and orchestrated a hybrid orchestral synth soundtrack.",
    result: "500K+ Wishlists",
    isRecent: false,
    featured: true,
    categoryPosition: 4,
    recentPosition: 9999
  },
  {
    id: "stripe-founders",
    title: "The Stripe Paradox",
    client: "Tech Commentary Creator",
    category: "Commentary",
    platform: "YouTube",
    duration: "16:30",
    year: "2024",
    youtubeLink: "https://www.youtube.com/watch?v=T-dJKvPi4pc",
    thumbnail: "https://img.youtube.com/vi/T-dJKvPi4pc/maxresdefault.jpg",
    description: "In-depth documentary analyzing the algorithmic dominance and infrastructure design behind internet commerce.",
    role: "Editor & Motion Graphics Lead",
    skills: ["Data Storytelling", "Kinetic Typography", "Explainer Editing", "Sound Design"],
    challenge: "Explaining complex payment infrastructure and code pipelines without losing the interest of a non-technical viewer.",
    solution: "Constructed animated isometric diagrams, UI simulations, and fast-moving visual metaphors to clarify abstract concepts.",
    result: "780K+ Views",
    isRecent: false,
    featured: true,
    categoryPosition: 5,
    recentPosition: 9999
  }
];
