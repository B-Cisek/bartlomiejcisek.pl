import SectionHeading from '@/components/section-heading.tsx';
import { useTranslation } from 'react-i18next';
import {
  SiPhp,
  SiLaravel,
  SiSymfony,
  SiHtml5,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiNuxtdotjs,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiLinux,
} from 'react-icons/si';

import { PiFileSqlDuotone } from 'react-icons/pi';
import { Layers, KeyRound, Globe } from 'lucide-react';
import { type ReactNode } from 'react';
import SkillCard, { Proficiency } from './skill-card';

type Skill = {
  name: string;
  icon: ReactNode;
  proficiency: Proficiency;
};

function Skills() {
  const { t } = useTranslation();

  const skills: Skill[] = [
    {
      name: 'PHP',
      icon: <SiPhp className="w-9 h-9 " />,
      proficiency: 'advanced',
    },
    {
      name: 'Laravel',
      icon: <SiLaravel className="w-8 h-8" />,
      proficiency: 'advanced',
    },
    {
      name: 'Symfony',
      icon: <SiSymfony className="w-8 h-8" />,
      proficiency: 'advanced',
    },
    {
      name: 'HTML',
      icon: <SiHtml5 className="w-8 h-8" />,
      proficiency: 'advanced',
    },
    {
      name: 'SQL',
      icon: <PiFileSqlDuotone className="w-8 h-8" />,
      proficiency: 'advanced',
    },
    {
      name: 'JavaScript',
      icon: <SiJavascript className="w-7 h-7" />,
      proficiency: 'advanced',
    },
    {
      name: 'Vue 3',
      icon: <SiVuedotjs className="w-8 h-8" />,
      proficiency: 'advanced',
    },
    {
      name: 'REST API',
      icon: <Globe className="w-8 h-8" />,
      proficiency: 'advanced',
    },
    {
      name: 'CSS (Tailwind CSS)',
      icon: <SiTailwindcss className="w-8 h-8" />,
      proficiency: 'intermediate',
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript className="w-7 h-7" />,
      proficiency: 'intermediate',
    },
    {
      name: 'Nuxt 4',
      icon: <SiNuxtdotjs className="w-8 h-8" />,
      proficiency: 'intermediate',
    },
    {
      name: 'JWT & OAuth',
      icon: <KeyRound className="w-7 h-7" />,
      proficiency: 'intermediate',
    },
    {
      name: 'Git (GitHub, GitLab)',
      icon: <SiGit className="w-8 h-8" />,
      proficiency: 'intermediate',
    },
    {
      name: 'Linux',
      icon: <SiLinux className="w-8 h-8" />,
      proficiency: 'intermediate',
    },
    {
      name: 'Docker',
      icon: <SiDocker className="w-8 h-8" />,
      proficiency: 'intermediate',
    },
    {
      name: 'React',
      icon: <SiReact className="w-8 h-8" />,
      proficiency: 'beginner',
    },
    {
      name: 'Node.js',
      icon: <SiNodedotjs className="w-8 h-8" />,
      proficiency: 'beginner',
    },
    {
      name: 'CQRS',
      icon: <Layers className="w-8 h-8" />,
      proficiency: 'beginner',
    },
  ];

  return (
    <section id="skills">
      <SectionHeading>{t('sections.skills.title')}</SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            name={skill.name}
            icon={skill.icon}
            proficiency={skill.proficiency}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
