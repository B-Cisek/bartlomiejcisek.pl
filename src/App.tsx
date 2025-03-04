import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import BaseLayout from '@/layouts/BaseLayout.tsx';
import Contact from '@/pages/Contact.tsx';
import Projects from '@/pages/Projects.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
