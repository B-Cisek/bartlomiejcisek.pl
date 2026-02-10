import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { projects, type Project } from '@/data/projects';

export function useProjects() {
  const { i18n } = useTranslation();

  const lang = i18n.language.startsWith('pl') ? 'pl' : 'en';
  const data = useMemo<Project[]>(() => projects[lang], [lang]);

  return { projects: data };
}
