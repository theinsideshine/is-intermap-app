import React from 'react';
import { CssBaseline, Typography, Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const AboutPage = () => {
  const theme = useTheme(); // Obtén el tema actual
  const isMobile = useMediaQuery('(max-width:600px)');
  const { isAuth } = useSelector(state => state.auth);

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
          ISMap es una aplicación innovadora diseñada para detectar interferencias geográficas que puedan impactar diversas áreas.
          El proyecto combina la visualización de datos con el análisis de anomalías, 
          enfocándose en posibles interferencias que afecten la comunicación y el funcionamiento de sistemas clave.
           Inspirada en los avances de Nikola Tesla, particularmente en su trabajo con la Torre Tesla,
            ISMap integra conceptos modernos de tecnología.
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
            El objetivo de ISMap es desarrollar un prototipo capaz de identificar si una ubicación específica 
          en el mapa interfiere con redes de cables eléctricos de alta tensión.
            Para ello, utiliza herramientas avanzadas como geolocalización,
          servicios en la nube que garantizan una respuesta rápida,
          e inteligencia artificial para corregir errores en los datos ingresados.
            Además, la información generada por la app puede integrarse fácilmente en sistemas como SAP, 
          ofreciendo una solución completa y eficiente.

        </Typography>
        {(!isAuth) && ( 
        <Button
              variant="contained"
              component={Link} to="/login"
              sx={{
                width: isMobile ? '50%' : '20%', // Ajusta el ancho del botón dependiendo del tamaño del viewport
                height: '30px', // Altura del botón
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: '0.8rem', // Tamaño de fuente del botón
                '&:hover': {
                  bgcolor: 'primary.dark', // Color de fondo al pasar el mouse
                },
                
              }}
            >
          Entrar
        </Button>
      )}

      </Box>
    </>
  );
};
