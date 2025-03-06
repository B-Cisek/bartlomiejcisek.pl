import { Navigation } from '@/components/navigation.tsx';
import { Outlet } from 'react-router-dom';
import { Particles } from '@/components/magicui/particles.tsx';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme.ts';

function BaseLayout() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);

  return (
    <div className="min-h-screen relative">
      <Particles
        className="fixed inset-0 z-0"
        quantity={250}
        ease={80}
        color={color}
        size={0.8}
        refresh
      />
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default BaseLayout;
