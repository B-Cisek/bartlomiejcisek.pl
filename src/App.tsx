import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseLayout from '@/layouts/BaseLayout.tsx';

// Lazy load page components for code-splitting
const Home = lazy(() => import('@/pages/Home.tsx'));
const Contact = lazy(() => import('@/pages/Contact.tsx'));
const Projects = lazy(() => import('@/pages/Projects.tsx'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Projects />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
