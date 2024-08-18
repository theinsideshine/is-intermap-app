import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Usa BrowserRouter
import { IntermapApp } from './intermapApp'; // Asegúrate de que el nombre del archivo sea correcto (mayúsculas y minúsculas)
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntermapApp />
    </BrowserRouter>
  </React.StrictMode>
);
