import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import CheckPage from './pages/CheckPage';

export const AppRoutes = ({ toggleDarkMode }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

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
          <Route path='/*' element={<HomePage/>} />
          <Route path="/intercheck" element={<CheckPage/>} />
        </Routes>
      </div>
      <Footer toggleDarkMode={toggleDarkMode}/>
    </div>
  );
}
