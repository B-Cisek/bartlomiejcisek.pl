import SectionHeading from '@/components/section-heading.tsx';
import { useTranslation } from 'react-i18next';
import TimeLine from '@/components/time-line.tsx';
import { BlurFade } from './magicui/blur-fade';

function Experience() {
  const { t } = useTranslation();

  const experienceItems = t('sections.experience.experienceItems', {
    returnObjects: true,
  }) as { title: string; subtitle: string; description: string }[];

  const experienceData = experienceItems.map(
    (
      item: { title: string; subtitle: string; description: string },
      index: number
    ) => ({
      id: index + 1,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
    })
  );

  return (
    <section id="experience">
      <BlurFade delay={0.05 * 4}>
        <SectionHeading>{t('sections.experience.title')}</SectionHeading>
        <TimeLine data={experienceData} />
      </BlurFade>
    </section>
  );
}

export default Experience;
