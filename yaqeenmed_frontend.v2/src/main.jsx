import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DarkModeProvider } from './context/DarkModeContext'; // 👈 add this line
import './index.css'; // make sure global styles are here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider> 
        <App />
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
);
