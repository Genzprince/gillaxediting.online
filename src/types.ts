export interface Project {
  /** Unique URL-friendly slug identifier (e.g. "skill-vs-dominance") */
  id: string;
  /** Display title of the project */
  title: string;
  /** Duration in MM:SS (e.g. "05:00" for Long Form, "00:45" for Short Form) */
  duration: string;
  /** Primary category / genre tag */
  category: "YouTube" | "Gaming" | "Documentary" | "Commercial" | "Motion Graphics" | "Short Form" | "Long Form" | "Events" | "Mystery" | "Commentary" | string;
  /** Full YouTube video or Shorts link */
  youtubeLink: string;
  /** Summary / project description */
  description: string;
  /** Client, creator, or channel name (Optional) */
  client?: string;
  /** Whether the video is featured in the portfolio (Optional, default true) */
  featured?: boolean;
  /** Whether the video is featured in the Recent Work tab (Optional) */
  isRecent?: boolean;
  /** Display order position in category filter tabs (Optional) */
  categoryPosition?: number;
  /** Display order position in Recent Work tab (Optional) */
  recentPosition?: number;
  /** Highlight result / metric stat (Optional, e.g. "40% Higher Retention") */
  result?: string;
  /** Role performed on the project (Optional, e.g. "Lead Video Editor & Motion Designer") */
  role?: string;
  /** Challenge faced during editing/storytelling (Optional) */
  challenge?: string;
  /** Solution applied to solve the challenge (Optional) */
  solution?: string;
  /** List of skill tags (Optional, e.g. ["Storytelling", "Sound Design"]) */
  skills?: string[];
  /** Auto-generated or custom YouTube embed iframe URL (Optional) */
  youtubeEmbed?: string;
  /** Link to Instagram post / reel (Optional) */
  instagramLink?: string;
  /** Direct MP4 / streaming video URL (Optional) */
  videoUrl?: string;
  /** Thumbnail image URL (Optional, auto-extracted from YouTube if omitted) */
  thumbnail?: string;
  /** Primary platform (Optional, e.g. "YouTube", "YouTube Shorts", "Instagram") */
  platform?: string;
  /** Release year (Optional, e.g. "2024") */
  year?: string;
  /** Whether the card is pinned to the top of the grid (Optional) */
  pinned?: boolean;
  /** Project date (Optional) */
  projectDate?: string;
}

export interface Skill {
  name: string;
  description: string;
  category: "Strategy" | "Execution" | "Artistry";
}

export interface Software {
  name: string;
  desc: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
}

export { longFormVideos } from "./data/longFormVideos";
export { shortFormVideos } from "./data/shortFormVideos";
export { PORTFOLIO_PROJECTS, ALL_PROJECTS } from "./data";

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Prince doesn't just cut clips together; he restructured our entire documentary channel. His editing strategy directly saved our retention rate, taking our average duration from 32% to 58%. He is an invaluable partner for any creator seeking premium results.",
    author: "Alexander Cole",
    role: "Executive Director",
    company: "Cinematic Essayist",
    avatarInitials: "AC"
  },
  {
    quote: "Working with Prince felt like collaborating with an agency of ten. He designed the sound, custom tracked titles, and edited a spec piece that instantly caught the eyes of automotive brand managers. Highly recommended for luxury styling.",
    author: "Elena Rostov",
    role: "Brand Campaign Lead",
    company: "Aura Creative",
    avatarInitials: "ER"
  },
  {
    quote: "His short-form loop strategy is legendary. We hit 18 million views on our very first launch because he understands audience psychology down to the millisecond. If you want cheap cuts, look elsewhere. If you want storytelling, hire Prince.",
    author: "Marcus Vance",
    role: "Lead Creator & Founder",
    company: "Growth Labs",
    avatarInitials: "MV"
  }
];

export const SKILLS_LIST: Skill[] = [
  {
    name: "Audience Psychology",
    description: "Structuring edits around neural attention triggers, retention curves, and visual hooks.",
    category: "Strategy"
  },
  {
    name: "Emotional Pacing",
    description: "Modulating structural breath, lingering pauses, and sudden crescendos to guide emotional arcs.",
    category: "Strategy"
  },
  {
    name: "Creative Direction",
    description: "Translating loose scripts into cohesive visual languages, framing styles, and mood profiles.",
    category: "Strategy"
  },
  {
    name: "Cinematic Soundscapes",
    description: "Layering ambient soundscapes, precise Foley accents, and audio ducking for hyper-immersive clarity.",
    category: "Execution"
  },
  {
    name: "Kinetic Motion Design",
    description: "Crafting organic text animations, tracking callouts, and elegant transitions that guide eye movement.",
    category: "Execution"
  },
  {
    name: "High-End Color Grading",
    description: "Developing custom color LUTs and tonal balances that reflect premium, luxury, and editorial brand aesthetics.",
    category: "Execution"
  }
];

export const SOFTWARE_LIST: Software[] = [
  { name: "Adobe Premiere Pro", desc: "My primary playground. Crafting raw assemblies, dialogue pacing, and complex timeline orchestration.", category: "NLE Editor" },
  { name: "After Effects", desc: "Kinetic typography, custom transitions, masking, tracking, and advanced visual styling.", category: "Motion & FX" },
  { name: "Audition & Foley", desc: "Audio repair, detailed wave-mixing, frequency cleaning, and deep bass balancing.", category: "Audio Design" },
  { name: "Photoshop & Illustrator", desc: "Asset separation, typographic layout planning, and pre-production storyboard styling.", category: "Vector & Assets" },
  { name: "ElevenLabs & AI Tools", desc: "Voice enhancement, ambient atmospheric generation, and creative mock voice profiling.", category: "AI Orchestration" }
];
