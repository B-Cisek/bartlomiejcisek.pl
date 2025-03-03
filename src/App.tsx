import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import BaseLayout from '@/layouts/BaseLayout.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
