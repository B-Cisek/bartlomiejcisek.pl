export interface Project {
  id: number;
  name: string;
  description: string;
  screenshot_url: string;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
}

export const projects: Record<'en' | 'pl', Project[]> = {
  pl: [],
  en: [],
};
