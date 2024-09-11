import React from 'react';
import { CssBaseline, Typography, useMediaQuery, Grid, Box, Button } from '@mui/material';
import torreImage from '../../assets/torre_tesla.png';
import { useTheme } from '@mui/material/styles';


export const HomePage = () => {
  const theme = useTheme(); // Obtén el tema actual

  const isMobile = useMediaQuery('(max-width:600px)');
  const imagePaths = [torreImage];

  return (
    <>
      <CssBaseline />
      <Box 
        style={{ 
          backgroundColor: theme.palette.background.default, // Utiliza el color de fondo de la paleta para el fondo
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {imagePaths.map((path, index) => (
            <Grid item xs={12} sm={6} key={index}> {/* Cambia el tamaño de la cuadrícula para la imagen */}
              <img src={path} alt={`La torre de testla ${index}`} style={{ width: '100%', borderRadius: '30px', filter: theme.palette.mode === 'dark' ? 'brightness(0.5)' : 'brightness(1)' }} />
            </Grid>
          ))}
        </Grid>

         {/* Texto grande */}
         <Typography variant="h3" sx={{ marginTop: '20px', textAlign: 'center' }}>La Torre de Tesla</Typography>
        {/* Texto pequeño */}
        <Typography variant="subtitle1" sx={{ marginTop: '10px', textAlign: 'center' }}>Verifica que no exista interfencias en el campoo</Typography>
        {/* Botón */}
        <Box
  sx={{
    width: '50%',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <Button
    variant="contained"
    sx={{
      width: isMobile ? '50%' : '20%', // Ajusta el ancho del botón dependiendo del tamaño del viewport
      height: '40px', // Altura del botón
      bgcolor: 'primary.main',
      color: 'white',
      fontSize: '0.8rem', // Tamaño de fuente del botón
      '&:hover': {
        bgcolor: 'primary.dark', // Color de fondo al pasar el mouse
      },
    }}
  >
    Verificar
  </Button>
</Box>

      </Box>

      
    </>
  );
};



