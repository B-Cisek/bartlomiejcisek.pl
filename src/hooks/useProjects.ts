import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export interface Project {
  id: number;
  name: string;
  description: string;
  screenshot_url: string;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
}

// TODO: Set to false when the API is ready
const USE_MOCK_DATA = true;

const mockProjects: Record<string, Project[]> = {
  pl: [
    {
      id: 1,
      name: 'Portfolio',
      description:
        'Osobista strona portfolio zbudowana z React, TypeScript i TailwindCSS. Zawiera animacje, obsługę dark/light mode oraz wielojęzyczność (PL/EN).',
      screenshot_url:
        'https://placehold.co/600x400/1e293b/3b82f6?text=Portfolio',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      demo_url: 'https://bartlomiejcisek.pl',
      github_url: 'https://github.com/bartlomiejcisek/bartlomiejcisek.pl',
    },
    {
      id: 2,
      name: 'System zarządzania zadaniami',
      description:
        'Aplikacja do zarządzania zadaniami z funkcjami drag & drop, przypisywaniem użytkowników i śledzeniem postępu. Backend oparty na Symfony z REST API.',
      screenshot_url:
        'https://placehold.co/600x400/1e293b/06b6d4?text=Task+Manager',
      technologies: ['Symfony', 'Vue 3', 'MySQL', 'Docker'],
      demo_url: null,
      github_url: 'https://github.com/bartlomiejcisek/task-manager',
    },
    {
      id: 3,
      name: 'API e-commerce',
      description:
        'RESTful API dla platformy e-commerce z obsługą produktów, koszyków, zamówień i płatności. Zbudowane w Laravel z uwierzytelnianiem JWT.',
      screenshot_url:
        'https://placehold.co/600x400/1e293b/14b8a6?text=E-commerce+API',
      technologies: ['Laravel', 'PHP', 'PostgreSQL', 'Redis'],
      demo_url: null,
      github_url: null,
    },
  ],
  en: [
    {
      id: 1,
      name: 'Portfolio',
      description:
        'Personal portfolio website built with React, TypeScript and TailwindCSS. Features animations, dark/light mode support and internationalization (PL/EN).',
      screenshot_url:
        'https://placehold.co/600x400/1e293b/3b82f6?text=Portfolio',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      demo_url: 'https://bartlomiejcisek.pl',
      github_url: 'https://github.com/bartlomiejcisek/bartlomiejcisek.pl',
    },
    {
      id: 2,
      name: 'Task Management System',
      description:
        'Task management application with drag & drop, user assignment and progress tracking features. Backend powered by Symfony with REST API.',
      screenshot_url:
        'https://placehold.co/600x400/1e293b/06b6d4?text=Task+Manager',
      technologies: ['Symfony', 'Vue 3', 'MySQL', 'Docker'],
      demo_url: null,
      github_url: 'https://github.com/bartlomiejcisek/task-manager',
    },
    {
      id: 3,
      name: 'E-commerce API',
      description:
        'RESTful API for an e-commerce platform with product, cart, order and payment handling. Built with Laravel and JWT authentication.',
      screenshot_url:
        'https://placehold.co/600x400/1e293b/14b8a6?text=E-commerce+API',
      technologies: ['Laravel', 'PHP', 'PostgreSQL', 'Redis'],
      demo_url: null,
      github_url: null,
    },
  ],
};

export function useProjects() {
  const { i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      const lang = i18n.language.startsWith('pl') ? 'pl' : 'en';
      setProjects(mockProjects[lang]);
      setIsLoading(false);
      return;
    }

    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<Project[]>(
          `${import.meta.env.VITE_APP_API_URL}/api/projects`,
          {
            headers: {
              'Accept-Language': i18n.language,
            },
          }
        );
        setProjects(response.data);
      } catch {
        setError('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  return { projects, isLoading, error };
}
