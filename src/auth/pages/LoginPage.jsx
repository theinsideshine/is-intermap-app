import React, { useState } from 'react';
import { Button, CssBaseline, TextField, Link, Paper, Box, Typography, Grid } from '@mui/material'; // Asegúrate de importar Grid desde '@mui/material'
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles';


const initialLoginForm = {
  username: '',
  password: '',
};

export const LoginPage = () => {
  const theme = useTheme(); // Obtén el tema actual
  const { handlerLogin } = useAuth();
  const [ setLoginForm] = useState(initialLoginForm);

  const onSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
      return;
    }

    handlerLogin({ username, password });
    setLoginForm(initialLoginForm);
  };

  return (
    <Grid container style={{ height: '70vh', backgroundColor: theme.palette.background.default }}>
      <CssBaseline />
      {/* Área de la imagen */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://picsum.photos/1920/1080/?random&retrobeats)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Área de Login */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square style={{ backgroundColor: theme.palette.background.default }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3, // Agregamos un padding para separar el contenido del borde
            borderRadius: 1, // Añadimos un borde redondeado
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: theme.palette.text.primary }}>
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
              sx={{
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.text.secondary,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              sx={{
                '& .MuiInputBase-input': { color: theme.palette.text.primary },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.text.secondary,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: theme.palette.primary.main }}>
                  {"No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
            <Link href="/" variant="body2" sx={{ color: theme.palette.primary.main }}>
              {"Volver"}
            </Link>
            
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
