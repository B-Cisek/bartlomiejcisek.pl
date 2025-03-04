import { Navigation } from '@/components/navigation.tsx';
import { Outlet } from 'react-router-dom';
import { Particles } from '@/components/magicui/particles.tsx';
import { useTheme } from '@/components/theme-provider.tsx';
import { useEffect, useState } from 'react';

function BaseLayout() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);

  return (
    <>
      <div className="relative min-h-screen">
        <Particles
          className="absolute inset-0 z-0 size-full"
          quantity={250}
          ease={80}
          color={color}
          size={0.8}
          refresh
        />
        <Navigation />
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default BaseLayout;
