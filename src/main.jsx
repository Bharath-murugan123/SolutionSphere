import React from 'react';
import { createRoot } from 'react-dom/client';
import SolutionSphere from './App.jsx';
import './global.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SolutionSphere />
  </React.StrictMode>
);
