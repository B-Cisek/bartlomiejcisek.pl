import { MagicCard } from '@/components/magicui/magic-card.tsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import type { Project } from '@/hooks/useProjects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <MagicCard
      className="rounded-xl"
      gradientColor={theme === 'dark' ? '#262626' : '#f5f5f5'}
    >
      <img
        src={project.screenshot_url}
        alt={project.name}
        className="aspect-video w-full object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="p-5 space-y-4">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-muted-foreground line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          {project.demo_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.demo_url} target="_blank" rel="noreferrer">
                <ExternalLink />
                {t('projects.demo')}
              </a>
            </Button>
          )}
          {project.github_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.github_url} target="_blank" rel="noreferrer">
                <Github />
                {t('projects.github')}
              </a>
            </Button>
          )}
        </div>
      </div>
    </MagicCard>
  );
}
