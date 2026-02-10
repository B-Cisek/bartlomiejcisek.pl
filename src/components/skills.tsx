import SectionHeading from '@/components/section-heading.tsx';
import { useTranslation } from 'react-i18next';
import SkillCard from './skill-card';
import { BlurFade } from './magicui/blur-fade';
import { skills } from '@/data/skills';

function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills">
      <BlurFade delay={0.05 * 4.5}>
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
      </BlurFade>
    </section>
  );
}

export default Skills;
