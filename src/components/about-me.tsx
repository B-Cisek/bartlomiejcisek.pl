import SectionHeading from '@/components/section-heading.tsx';
import { useTranslation } from 'react-i18next';
import { BlurFade } from '@/components/magicui/blur-fade.tsx';

function AboutMe() {
  const { t } = useTranslation();

  return (
    <section id="about-me">
      <BlurFade delay={0.25 * 2.5} direction="down" inView>
        <SectionHeading>{t('sections.aboutMe.title')}</SectionHeading>
      </BlurFade>
      <BlurFade delay={0.25 * 3} direction="down" inView>
        <p className="text-lg">{t('sections.aboutMe.content')}</p>
      </BlurFade>
    </section>
  );
}

export default AboutMe;
