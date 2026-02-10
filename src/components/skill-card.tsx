import { MagicCard } from './magicui/magic-card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';

export type Proficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  proficiency: Proficiency;
}

function SkillCard({ name, icon, proficiency }: SkillCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-purple-500';
      case 'expert':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProficiencyValue = (proficiency: Proficiency): number => {
    switch (proficiency) {
      case 'beginner':
        return 25;
      case 'intermediate':
        return 50;
      case 'advanced':
        return 75;
      case 'expert':
        return 100;
    }
  };

  return (
    <MagicCard
      className="rounded-xl border"
      gradientColor={theme === 'dark' ? '#262626' : '#f5f5f5'}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{name}</span>
            <Badge className={getProficiencyColor(proficiency)}>
              {t(`sections.skills.levels.${proficiency}`)}
            </Badge>
          </div>
          <Progress value={getProficiencyValue(proficiency)} className="h-2" />
        </div>
      </div>
    </MagicCard>
  );
}

export default SkillCard;
