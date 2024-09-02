import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import CheckPage from './pages/CheckPage';
import ViewKmlPage from './pages/ViewKmlPage';

export const AppRoutes = ({ toggleDarkMode }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  // Hook useState para manejar kmlUrl y pointCoord
  const [kmlUrl, setKmlUrl] = useState(sessionStorage.getItem('fileUrl') || '');
  const [pointCoord, setPointCoord] = useState(() => {
    const storedPoint = sessionStorage.getItem('representativePoint');
    console.log('Initial pointCoord from sessionStorage:', storedPoint);
    return storedPoint ? JSON.parse(storedPoint) : null;
  });

// Hook useEffect para actualizar kmlUrl y pointCoord cuando el evento 'kmlDataUpdated' se dispare
useEffect(() => {
  const handleKmlDataUpdate = () => {
    const updatedKmlUrl = sessionStorage.getItem('fileUrl') || '';
    setKmlUrl(updatedKmlUrl);
    console.log('Updated kmlUrl from sessionStorage:', updatedKmlUrl);

    const storedPoint = sessionStorage.getItem('representativePoint');
    const parsedPoint = storedPoint ? JSON.parse(storedPoint) : null;
    setPointCoord(parsedPoint);
    console.log('Updated pointCoord from sessionStorage:', parsedPoint);
  };

  // Añadir listener para el evento customizado 'kmlDataUpdated'
  window.addEventListener('kmlDataUpdated', handleKmlDataUpdate);

  // Limpieza del listener cuando el componente se desmonte
  return () => {
    window.removeEventListener('kmlDataUpdated', handleKmlDataUpdate);
  };
}, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div
        style={{ 
          flex: 1,
          marginBottom: "20px",
          padding: isSmallScreen ? "10px" : "20px",
        }}
      >
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path="/intercheck" element={<CheckPage />} />
          <Route path="/viewkml" element={<ViewKmlPage kmlUrl={kmlUrl} pointCoord={pointCoord} />} />
        </Routes>
      </div>
      <Footer toggleDarkMode={toggleDarkMode} />
    </div>
  );
};
