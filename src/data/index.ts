import { Project } from "../types";
import { longFormVideos } from "./longFormVideos";
import { shortFormVideos } from "./shortFormVideos";

export { longFormVideos } from "./longFormVideos";
export { shortFormVideos } from "./shortFormVideos";

/**
 * Combined list of all portfolio projects (Long-Form + Short-Form).
 */
export const PORTFOLIO_PROJECTS: Project[] = [
  ...longFormVideos,
  ...shortFormVideos
];

export const ALL_PROJECTS = PORTFOLIO_PROJECTS;
