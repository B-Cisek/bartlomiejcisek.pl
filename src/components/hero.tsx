import { BlurFade } from '@/components/magicui/blur-fade.tsx';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TypingAnimation } from './ui/typing-animation';

function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function redirectTo(page: 'contact' | 'projects') {
    navigate(`/${page}`);
  }

  return (
    <section id="hero">
      <TypingAnimation
        typeSpeed={50}
        className="text-2xl font-bold tracking-tight sm:text-4xl xl:text-5xl"
      >
        {t('sections.hero.title')}
      </TypingAnimation>
      <BlurFade delay={0.05 * 1.5} className="mt-4">
        <span className="text-pretty text-xl tracking-tighter sm:text-2xl xl:text-3xl">
          {t('sections.hero.subtitle')}
        </span>
      </BlurFade>
      <BlurFade delay={0.05 * 2} className="mt-10">
        <div className=" flex gap-4">
          <InteractiveHoverButton
            onClick={() => redirectTo('contact')}
            className="relative overflow-hidden"
          >
            {t('sections.hero.buttons.contact')}
          </InteractiveHoverButton>

          <InteractiveHoverButton onClick={() => redirectTo('projects')}>
            {t('sections.hero.buttons.viewProjects')}
          </InteractiveHoverButton>
        </div>
      </BlurFade>
    </section>
  );
}

export default Hero;
