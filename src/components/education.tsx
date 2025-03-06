import { BlurFade } from '@/components/magicui/blur-fade.tsx';
import SectionHeading from '@/components/section-heading.tsx';
import { useTranslation } from 'react-i18next';
import TimeLine from '@/components/time-line.tsx';

function Education() {
  const { t } = useTranslation();

  const educationItems = t('sections.education.educationItems', {
    returnObjects: true,
  }) as { title: string; subtitle: string; description: string }[];

  const educationData = educationItems.map(
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
    <section id="education">
      <BlurFade delay={0.25 * 3.5} inView>
        <SectionHeading>{t('sections.education.title')}</SectionHeading>
      </BlurFade>
      <BlurFade delay={0.25 * 3.5} inView>
        <TimeLine data={educationData} />
      </BlurFade>
    </section>
  );
}

export default Education;
