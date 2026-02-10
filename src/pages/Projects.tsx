import { useTranslation } from 'react-i18next';
import { BlurFade } from '@/components/magicui/blur-fade.tsx';
import { ProjectCard } from '@/components/project-card';
import { useProjects } from '@/hooks/useProjects';

function Projects() {
  const { t } = useTranslation();
  const { projects } = useProjects();

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-8 sm:mt-16 mb-16 px-4">
      <BlurFade delay={0.05} inView>
        <h2 className="py-1 text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
          {t('projects.title')}
        </h2>
      </BlurFade>
      {projects.length === 0 ? (
        <BlurFade delay={0.1} inView>
          <p className="mt-6 text-xl text-muted-foreground">soon...</p>
        </BlurFade>
      ) : (
        <div className="flex flex-col gap-5 mt-6">
          {projects.map((project, index) => (
            <BlurFade key={project.id} delay={0.05 * (index + 2)} inView>
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
