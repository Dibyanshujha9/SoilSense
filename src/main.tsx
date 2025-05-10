import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/MainPannel.tsx';
import AdminPanel from './components/AdminPannel.tsx'; 
import UiElement from './components/UiElement.tsx';
import Chat from '../chatbot/WeatherChatbot.tsx';

import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<UiElement />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/uielement" element={<UiElement />} />
        <Route path="/app" element={<App />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
