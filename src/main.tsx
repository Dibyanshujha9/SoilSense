import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/MainPannel.tsx';
import AdminPanel from './components/AdminPannel.tsx'; 
import SoilDashboard3D from './components/UiElement.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<SoilDashboard3D />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
