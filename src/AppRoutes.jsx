import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './auth/pages/LoginPage';
import { useSelector } from 'react-redux';
import { UserRoutes } from './routes/UserRoutes';
import { SignUp } from './auth/pages/SignUpPage';
import { AboutPage } from './pages/about/AboutPage';


export const AppRoutes = ({ toggleDarkMode }) => {

  const { isAuth } = useSelector(state => state.auth);
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
      <div style={{ flex: 1,
                    marginBottom: "20px",
                    padding: isSmallScreen ? "10px" : "20px", // Ajusta el espacio según el breakpoint           
                    }}>
            <Routes>

                 {
                        isAuth
                            ? (
                                <Route path='/*' element={<UserRoutes  kmlUrl={kmlUrl} pointCoord={pointCoord}/>} />
                            )
                            : <>
                                <Route path='/about' element={<AboutPage />} />
                                <Route path='/login' element={<LoginPage />} />
                                <Route path='/signup' element={<SignUp/>} /> 
                                <Route path='/*' element={<HomePage/>} />                               
                            </>

                    }         
         
        </Routes>
      </div>
      <Footer toggleDarkMode={toggleDarkMode} />
    </div>
  );
};
