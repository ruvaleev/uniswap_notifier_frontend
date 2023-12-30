import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import './styles/tailwindOutput.css';
import App from './App';

const root = document.getElementById('app');
const appRoot = createRoot(root);
appRoot.render(<App />);
