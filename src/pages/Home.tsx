import Hero from '@/components/hero.tsx';
import AboutMe from '@/components/about-me.tsx';
import Experience from '@/components/experience.tsx';
import Education from '@/components/education.tsx';
import Skills from '@/components/skills.tsx';

function Home() {
  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 py-16 gap-14">
      <Hero />
      <AboutMe />
      <Education />
      <Experience />
      <Skills />
    </div>
  );
}

export default Home;
