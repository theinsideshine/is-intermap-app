import React from 'react';
import { CssBaseline, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const AboutPage = () => {
  const theme = useTheme(); // Obtén el tema actual

  return (
    <>
      <CssBaseline />
      <Box 
        style={{ 
          backgroundColor: theme.palette.background.default, // Utiliza el color de fondo de la paleta para el fondo
          padding: '40px',  // Mayor espacio alrededor del contenido
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
        }}
      >
        {/* Título principal */}
        <Typography variant="h3" sx={{ marginBottom: '30px', textAlign: 'center' }}>Acerca de ISMap</Typography>
        
        {/* Texto descriptivo con mayor tamaño */}
        <Typography 
          variant="body1" 
          sx={{ 
            marginBottom: '20px', 
            textAlign: 'center', 
            maxWidth: '800px', 
            fontSize: '1.2rem', // Aumento de tamaño de texto
            lineHeight: '1.8', // Mayor espaciado entre líneas
          }}
        >
          ISMap es una aplicación diseñada para ayudar en la detección de interferencias en diferentes áreas. 
          El proyecto se basa en la visualización de datos y en el análisis de posibles anomalías que puedan 
          afectar la comunicación y el funcionamiento de los sistemas. Este proyecto toma inspiración en los 
          avances de Nikola Tesla, específicamente en la tecnología que rodea la Torre de Tesla.
        </Typography>

        {/* Información adicional con mayor tamaño */}
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center', 
            maxWidth: '800px', 
            fontSize: '1.2rem', // Aumento de tamaño de texto
            lineHeight: '1.8', // Mayor espaciado entre líneas
          }}
        >
          Nuestro objetivo es proporcionar una plataforma precisa y eficiente para identificar interferencias 
          que puedan afectar sistemas críticos. Trabajamos continuamente para mejorar la funcionalidad y 
          usabilidad de ISMap, incorporando nuevas características basadas en las necesidades de nuestros usuarios.
        </Typography>
      </Box>
    </>
  );
};
