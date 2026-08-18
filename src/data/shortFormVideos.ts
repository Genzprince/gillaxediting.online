import { Project } from "../types";

/**
 * ============================================================================
 * 📱 SHORT FORM VIDEO TEMPLATE & MANAGEMENT
 * ============================================================================
 * 
 * Use this file to manage all Short-Form videos (e.g. YouTube Shorts,
 * Instagram Reels, TikToks, high-retention ads, motion graphic reels).
 * 
 * ----------------------------------------------------------------------------
 * 📋 FIELD SPECIFICATION (What is REQUIRED vs OPTIONAL):
 * ----------------------------------------------------------------------------
 * 
 * [REQUIRED FIELDS]:
 *  - id                (string)  : Unique URL-safe identifier slug. (e.g. "no-magic-pill")
 *  - title             (string)  : Display title of the short video.
 *  - category          (string)  : Video genre/category. Options include:
 *                                  "Motion Graphics" | "Commercial" | "Gaming" | "Events" | 
 *                                  "Mystery" | "Short Form" | "YouTube"
 *  - duration          (string)  : Formatted duration in "MM:SS" format (e.g. "00:45", "00:30", "00:50").
 *                                  IMPORTANT: Must start with "00:" so the site automatically
 *                                  renders it inside the Short Form 9:16 vertical grid layout!
 *  - youtubeLink       (string)  : Full YouTube Shorts URL or video link.
 *                                  (e.g. "https://youtube.com/shorts/kc6z2D-7i1k" or "https://www.youtube.com/watch?v=...")
 *  - description       (string)  : Concise summary of the short video, hook strategy, or concept.
 * 
 * [OPTIONAL FIELDS]:
 *  - client            (string)  : Client, creator, or channel name. (e.g. "Tech Creator", "Personal Showcase")
 *  - platform          (string)  : Primary platform (e.g. "YouTube Shorts", "Instagram", "TikTok").
 *  - year              (string)  : Release year (e.g. "2024").
 *  - thumbnail         (string)  : Custom cover image URL. If left blank or omitted, the system
 *                                  AUTOMATICALLY extracts the high-resolution maxres YouTube thumbnail!
 *  - youtubeEmbed      (string)  : Custom embed URL. If omitted, auto-generated from youtubeLink.
 *  - instagramLink     (string)  : Direct link to Instagram post / reel.
 *  - videoUrl          (string)  : Direct MP4 or external video URL (for custom video players).
 *  - role              (string)  : Your role in the project. (e.g. "Lead Video Editor & Motion Designer")
 *  - skills            (string[]): Array of tags/skills. (e.g. ["Typography", "After Effects", "Sound Design"])
 *  - result            (string)  : Key result/metric stat. (e.g. "10M+ Reach", "5M+ Views", "Portfolio Showcase")
 *  - challenge         (string)  : Editing/retention challenge description (used in Case Study modal).
 *  - solution          (string)  : How you tackled and solved the challenge (used in Case Study modal).
 *  - isRecent          (boolean) : Set to `true` to feature in the "Recent Work" tab. (default: false)
 *  - featured          (boolean) : Set to `true` to display in portfolio showcase. (default: true)
 *  - pinned            (boolean) : Set to `true` to pin to the very top of the grid. (default: false)
 *  - categoryPosition  (number)  : Custom display sort order in category filters (1, 2, 3...).
 *  - recentPosition    (number)  : Custom display sort order in Recent Work tab (1, 2, 3...).
 *  - projectDate       (string)  : Formatted date string (e.g. "2024-06-15").
 * 
 * ----------------------------------------------------------------------------
 * ✂️ COPY-PASTE TEMPLATE (To add a new short, copy and fill this block):
 * ----------------------------------------------------------------------------
 * 
 * {
 *   id: "your-short-slug",
 *   title: "Your Short Title",
 *   client: "Client / Creator Name",
 *   category: "Motion Graphics", // "Motion Graphics" | "Commercial" | "Gaming" | "Events" | "Mystery"
 *   platform: "YouTube Shorts", // "YouTube Shorts" | "Instagram" | "TikTok"
 *   duration: "00:45", // MUST start with 00: (e.g. 00:30, 00:45, 00:55)
 *   year: "2024",
 *   youtubeLink: "https://youtube.com/shorts/YOUR_VIDEO_ID",
 *   thumbnail: "", // Optional: Leave blank to auto-fetch from YouTube
 *   description: "High-impact description of the short and retention hook...",
 *   role: "Lead Editor & Motion Designer",
 *   skills: ["Typography", "Sound Design", "Audience Retention"],
 *   result: "5M+ Views",
 *   challenge: "Describe the retention challenge or hook requirements...",
 *   solution: "Describe the pacing, motion graphics, and audio workflow...",
 *   isRecent: true,
 *   featured: true,
 *   categoryPosition: 1,
 *   recentPosition: 1
 * },
 * ============================================================================
 */

export const shortFormVideos: Project[] = [
  {
    id: "no-magic-pill",
    title: "No Magic Pill Motion Graphic reel",
    client: "Personal Showcase",
    category: "Commercial",
    platform: "YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://youtube.com/shorts/kc6z2D-7i1k",
    thumbnail: "https://img.youtube.com/vi/kc6z2D-7i1k/maxresdefault.jpg",
    description: "A fast-paced motion graphics reel created to showcase advanced Adobe After Effects skills and modern social media editing techniques. The concept highlights how creators constantly chase views and search for a \"viral formula,\" while emphasizing the message that there is no magic pill for success—only consistency, creativity, and hard work.",
    role: "Motion Designer & Creative Director",
    skills: ["Typography", "After Effects", "Sound Design", "Kinetic Motion"],
    challenge: "Create a visually striking motion graphics piece that showcases advanced After Effects skills while delivering a memorable message with zero drop-off.",
    solution: "Designed a fast-paced visual sequence using custom typography animations, cinematic transitions, and precisely synchronized sound design.",
    result: "Portfolio Showcase",
    isRecent: true,
    featured: true,
    categoryPosition: 1,
    recentPosition: 1
  },
  {
    id: "bolt-motivation",
    title: "Bolt Motivation",
    client: "Motivation Brand",
    category: "Mystery",
    platform: "YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://youtube.com/shorts/waODTGRgnjw",
    instagramLink: "https://www.instagram.com/reel/C7pA-g3ID-h/",
    thumbnail: "https://img.youtube.com/vi/waODTGRgnjw/maxresdefault.jpg",
    description: "A high-retention motivational short designed to inspire action through cinematic storytelling and emotionally charged pacing.",
    role: "Lead Video Editor",
    skills: ["Storytelling", "Sound Design", "Audience Retention", "Emotional Pacing"],
    challenge: "The client needed premium-quality motivational videos that could compete with the best-performing creators while maximizing retention on a budget.",
    solution: "Developed a cinematic editing workflow combining emotional pacing, animation-driven motion graphics, and music synchronization.",
    result: "5M+ Views",
    isRecent: true,
    featured: true,
    categoryPosition: 2,
    recentPosition: 2
  },
  {
    id: "pay-with-meta-glasses",
    title: "Pay with Facebook Meta Glasses",
    client: "Techiela (10M+ Audience)",
    category: "Motion Graphics",
    platform: "Instagram / YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://youtube.com/shorts/8CRSbenK7xE",
    instagramLink: "https://www.instagram.com/reel/C8_XyP-oWdf/",
    thumbnail: "https://img.youtube.com/vi/8CRSbenK7xE/maxresdefault.jpg",
    description: "Produced an AI-enhanced explainer video for Techiela, a technology creator with over 10 million subscribers. The project focused on demonstrating the future of digital payments through Facebook Meta Glasses, combining AI-generated visuals, voiceovers, and motion graphics to bring the concept to life in an engaging and visually compelling way.",
    role: "Lead Editor & Motion Designer",
    skills: ["Storytelling", "Motion Graphics", "Sound Design", "AI Visuals"],
    challenge: "The challenge was to explain a futuristic technology concept in a way that felt exciting, visually engaging, and easy for a broad audience to understand.",
    solution: "Built a visual-first storytelling approach using AI-generated imagery, cinematic motion graphics, advanced compositing, and voice-driven editing.",
    result: "10M+ Reach",
    isRecent: true,
    featured: true,
    categoryPosition: 8,
    recentPosition: 3
  },
  {
    id: "basketball-edits",
    title: "Basketball Edits",
    client: "Basketball Creators",
    category: "Events",
    platform: "YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://www.youtube.com/shorts/LysvLZnHBwY",
    thumbnail: "https://img.youtube.com/vi/LysvLZnHBwY/maxresdefault.jpg",
    description: "Turned interview clips into daily short-form basketball videos (2/day) by building voiceover-driven stories, adding beat-synced music, and integrating B-roll highlights.",
    role: "Short Form Video Editor",
    skills: ["Sports Editing", "Beat Syncing", "Story Pacing", "B-Roll Integration"],
    challenge: "Producing high-volume (2/day) sports content while keeping retention high and narrative engaging.",
    solution: "Built streamlined workflows for rapid voiceover story structures, beat-synced audio cuts, and dynamic B-roll placement.",
    result: "2 Videos/Day Retention Series",
    isRecent: true,
    featured: true,
    categoryPosition: 9,
    recentPosition: 4
  },
  {
    id: "gaming-creator-network",
    title: "Gaming Creator Network",
    client: "Trigger Insaan",
    category: "Gaming",
    platform: "YouTube Shorts",
    duration: "00:45",
    year: "2023",
    youtubeLink: "https://youtube.com/shorts/-wgbizdRjpI",
    thumbnail: "https://img.youtube.com/vi/-wgbizdRjpI/maxresdefault.jpg",
    description: "High-retention short-form content produced for one of India's largest gaming creator ecosystems.",
    role: "Lead Editor & Strategist",
    skills: ["Gaming Storytelling", "Audience Retention", "Creative Direction", "Meme Pacing"],
    challenge: "Managing multiple gaming channels required maintaining consistent production quality while giving each creator a distinct editing style.",
    solution: "Developed complete post-production workflows covering content planning, scripting, gameplay pacing, meme integration, and cinematic editing.",
    result: "25M+ Audience",
    isRecent: false,
    featured: true,
    categoryPosition: 3,
    recentPosition: 9999
  },
  {
    id: "debate-highlights",
    title: "Debate Highlights",
    client: "US Commentary Creator",
    category: "Events",
    platform: "TikTok / YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://youtube.com/shorts/RvkEwv-abOU",
    thumbnail: "https://img.youtube.com/vi/RvkEwv-abOU/maxresdefault.jpg",
    description: "A dynamic short-form edit transforming lengthy debate recordings into engaging, viral highlights optimized for social media retention.",
    role: "Lead Video Editor",
    skills: ["Storytelling", "Dynamic Editing", "Content Strategy", "Caption Styling"],
    challenge: "The original debate recordings contained lengthy discussions and slow pacing that reduced viewer retention.",
    solution: "Identified the strongest discussion points, restructured conversations into a clear narrative flow, and enhanced key moments with text animations.",
    result: "3M+ Views",
    isRecent: false,
    featured: true,
    categoryPosition: 4,
    recentPosition: 9999
  },
  {
    id: "festival-sale-campaign",
    title: "Festival Sale Campaign",
    client: "Retail Brand",
    category: "Commercial",
    platform: "Instagram / YouTube Shorts",
    duration: "00:45",
    year: "2023",
    youtubeLink: "https://youtube.com/shorts/1y0-1ovcPmg",
    thumbnail: "https://img.youtube.com/vi/1y0-1ovcPmg/maxresdefault.jpg",
    description: "A festive promotional advertisement transforming a standard sales announcement into an engaging, high-impact marketing campaign.",
    role: "Video Editor & Motion Designer",
    skills: ["Commercial Editing", "Motion Graphics", "Sound Design", "Typography"],
    challenge: "The client needed to showcase multiple festive offers within a short timeframe without overwhelming viewers.",
    solution: "Designed a fast-paced commercial edit using animated typography, promotional motion graphics, and carefully synchronized sound effects.",
    result: "120 Videos Edited",
    isRecent: false,
    featured: true,
    categoryPosition: 5,
    recentPosition: 9999
  },
  {
    id: "inside-the-unknown",
    title: "Inside the Unknown",
    client: "Entertainment Creator",
    category: "Mystery",
    platform: "YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://youtube.com/shorts/2XHEds47WiE",
    thumbnail: "https://img.youtube.com/vi/2XHEds47WiE/maxresdefault.jpg",
    description: "A suspense-driven short-form content series transforming abandoned house explorations into cinematic mystery stories.",
    role: "Video Editor & Script Writer",
    skills: ["Suspense Storytelling", "Sound Design", "AI Voiceover", "Atmospheric Audio"],
    challenge: "Raw exploration footage lacked structure and emotional progression, making it difficult to maintain audience attention.",
    solution: "Developed engaging narrative structures, generated AI voiceovers, and crafted cinematic edits using suspenseful pacing and timed reveals.",
    result: "8M+ Views",
    isRecent: false,
    featured: true,
    categoryPosition: 6,
    recentPosition: 9999
  },
  {
    id: "cryon-effect",
    title: "Cryon Effect",
    client: "Instagram Viral Trend / Showcase",
    category: "Motion Graphics",
    platform: "Instagram / YouTube Shorts",
    duration: "00:45",
    year: "2024",
    youtubeLink: "https://youtube.com/shorts/3XCawh9kBrI",
    thumbnail: "https://img.youtube.com/vi/3XCawh9kBrI/maxresdefault.jpg",
    description: "Created a trend-focused social media video based on the viral Cryon editing style that gained popularity on Instagram. The project showcased the transformation of an Instagram profile using AI-generated visuals, creative storytelling, and motion graphics to create an engaging and shareable short-form video.",
    role: "Motion Designer & Video Editor",
    skills: ["Motion Graphics", "AI Visuals", "Trend Strategy", "Kinetic Effects"],
    challenge: "Capturing the rapidly evolving viral Cryon trend with precise visual timing and high aesthetic execution.",
    solution: "Integrated AI-generated visuals and custom kinetic motion graphics to produce an ultra-engaging short that hooks viewers immediately.",
    result: "Viral Instagram Trend",
    isRecent: false,
    featured: true,
    categoryPosition: 7,
    recentPosition: 9999
  }
];
