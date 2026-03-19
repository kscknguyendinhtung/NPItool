import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
console.log("InsightPro: Initializing...");
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
