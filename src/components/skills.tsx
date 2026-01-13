import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import SectionHeading from '@/components/section-heading.tsx';
import { useTranslation } from 'react-i18next';

type Skill = {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  proficiencyValue: number;
};

function Skills() {
  const { t } = useTranslation();

  const skills: Skill[] = [
    {
      name: 'PHP (OOP, SOLID, Design Patterns)',
      proficiency: 'Advanced',
      proficiencyValue: 75,
    },
    { name: 'Laravel', proficiency: 'Advanced', proficiencyValue: 75 },
    { name: 'Symfony', proficiency: 'Advanced', proficiencyValue: 75 },
    { name: 'HTML', proficiency: 'Advanced', proficiencyValue: 75 },
    {
      name: 'CSS (Tailwind CSS)',
      proficiency: 'Intermediate',
      proficiencyValue: 50,
    },
    { name: 'JavaScript', proficiency: 'Advanced', proficiencyValue: 75 },
    { name: 'TypeScript', proficiency: 'Intermediate', proficiencyValue: 50 },
    { name: 'SQL', proficiency: 'Advanced', proficiencyValue: 75 },
    { name: 'Vue 3', proficiency: 'Advanced', proficiencyValue: 75 },
    { name: 'Nuxt 3', proficiency: 'Intermediate', proficiencyValue: 50 },
    { name: 'React', proficiency: 'Beginner', proficiencyValue: 25 },
    { name: 'Node.js', proficiency: 'Beginner', proficiencyValue: 25 },
    {
      name: 'Git (GitHub, GitLab)',
      proficiency: 'Intermediate',
      proficiencyValue: 50,
    },
    {
      name: 'Docker & Docker Compose',
      proficiency: 'Intermediate',
      proficiencyValue: 50,
    },
    { name: 'Linux', proficiency: 'Intermediate', proficiencyValue: 50 },
    { name: 'CQRS', proficiency: 'Beginner', proficiencyValue: 25 },
    { name: 'JWT & OAuth', proficiency: 'Intermediate', proficiencyValue: 50 },
    {
      name: 'REST API Architecture',
      proficiency: 'Advanced',
      proficiencyValue: 75,
    },
  ];

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'Beginner':
        return 'bg-blue-500';
      case 'Intermediate':
        return 'bg-green-500';
      case 'Advanced':
        return 'bg-purple-500';
      case 'Expert':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="skills">
      <SectionHeading>{t('sections.skills.title')}</SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{skill.name}</span>
              <Badge className={getProficiencyColor(skill.proficiency)}>
                {skill.proficiency}
              </Badge>
            </div>
            <Progress value={skill.proficiencyValue} className="h-2" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
