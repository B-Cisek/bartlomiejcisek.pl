import { MagicCard } from '@/components/magicui/magic-card.tsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ImageOff } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import type { Project } from '@/data/projects';
import { PiGithubLogo } from 'react-icons/pi';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [imgError, setImgError] = useState(false);

  return (
    <MagicCard
      className="rounded-xl"
      gradientColor={theme === 'dark' ? '#262626' : '#f5f5f5'}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative shrink-0 group">
          {imgError ? (
            <div className="flex items-center justify-center aspect-video sm:w-56 md:w-64 bg-muted rounded-t-xl sm:rounded-t-none sm:rounded-l-xl">
              <ImageOff className="size-8 text-muted-foreground" />
            </div>
          ) : (
            <img
              src={project.screenshot_url}
              alt={project.name}
              className="block aspect-video sm:w-56 md:w-64 object-cover rounded-t-xl sm:rounded-t-none sm:rounded-l-xl"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 p-2 bg-linear-to-t from-black/60 to-transparent sm:rounded-bl-xl">
            {project.demo_url && (
              <Button variant="secondary" size="sm" asChild>
                <a href={project.demo_url} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" />
                  {t('projects.demo')}
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button variant="secondary" size="sm" asChild>
                <a href={project.github_url} target="_blank" rel="noreferrer">
                  <PiGithubLogo className="size-3.5" />
                  {t('projects.github')}
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="p-4 space-y-2 min-w-0">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
