import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/css/index.css';
import '@/lib/i18n.ts';
import App from '@/App.tsx';
import { ThemeProvider } from '@/providers/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
