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
  pl: [
    {
      id: 1,
      name: 'Gym Management SaaS (Backend)',
      description:
        'Gym Management SaaS to multi-tenant system dla sieci siłowni, pozwalający na zarządzanie klientami, karnetami, grafikiem zajęć oraz check-inami.',
      screenshot_url:
        'https://github.com/B-Cisek/gym-frontend/blob/main/screenshot.png?raw=true',
      technologies: ['Symfony', 'PostgreSQL', 'Redis'],
      github_url: 'https://github.com/B-Cisek/gym-backend',
      demo_url: null,
    },
    {
      id: 2,
      name: 'Gym Management SaaS (Frontend)',
      description:
        'Gym Management SaaS to multi-tenant system dla sieci siłowni, pozwalający na zarządzanie klientami, karnetami, grafikiem zajęć oraz check-inami.',
      screenshot_url:
        'https://github.com/B-Cisek/gym-frontend/blob/main/screenshot.png?raw=true',
      technologies: ['Nuxt', 'TypeScript', 'Pinia', 'Tailwind CSS'],
      github_url: 'https://github.com/B-Cisek/gym-frontend',
      demo_url: null,
    },
  ],
  en: [
    {
      id: 1,
      name: 'Gym Management SaaS (Backend)',
      description:
        'Gym Management SaaS is a multi-tenant system for gym networks, enabling management of clients, memberships, class schedules, and check-ins.',
      screenshot_url:
        'https://github.com/B-Cisek/gym-frontend/blob/main/screenshot.png?raw=true',
      technologies: ['Symfony', 'PostgreSQL', 'Redis'],
      github_url: 'https://github.com/B-Cisek/gym-backend',
      demo_url: null,
    },
    {
      id: 2,
      name: 'Gym Management SaaS (Frontend)',
      description:
        'Gym Management SaaS is a multi-tenant system for gym networks, enabling management of clients, memberships, class schedules, and check-ins.',
      screenshot_url:
        'https://github.com/B-Cisek/gym-frontend/blob/main/screenshot.png?raw=true',
      technologies: ['Nuxt', 'TypeScript', 'Pinia', 'Tailwind CSS'],
      github_url: 'https://github.com/B-Cisek/gym-frontend',
      demo_url: null,
    },
  ],
};
