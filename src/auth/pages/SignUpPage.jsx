import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useUsers } from '../../hooks/useUsers';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';

export const SignUp = () => {

  const theme = useTheme(); // Obtener el tema actual
  const { initialUserForm, handlerAddUser, errors } = useUsers();

  
  const { handlerRegisterUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      cuit: data.get('cuit'),
      name: data.get('name'),
      address: data.get('address'),
      phone: data.get('phone'),
      mobile: data.get('mobile'),
      contact: data.get('contact')
    });

    handlerRegisterUser({      
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      cuit: data.get('cuit'),
      name: data.get('name'),
      address: data.get('address'),
      phone: data.get('phone'),
      mobile: data.get('mobile'),
      contact: data.get('contact'),
     
    });
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(3),
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: theme.spacing(2) }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  autoFocus
                  variant="outlined"
                  size="small"
                />
                {errors && errors.username && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.username}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  size="small"
                />
                {errors && errors.email && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.email}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  size="small"
                />
                {errors && errors.password && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.password}
                  </Alert>
                )}
              </Grid>

              {/* Campos adicionales en dos columnas */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cuit"
                  label="CUIT"
                  name="cuit"
                  autoComplete="cuit"
                  variant="outlined"
                  size="small"
                />
                 {errors && errors.cuit && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.cuit}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  autoComplete="name"
                  variant="outlined"
                  size="small"
                />
                {errors && errors.name&& (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.name}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Direccion"
                  name="address"
                  autoComplete="address"
                  variant="outlined"
                  size="small"
                />
                 {errors && errors.address && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.address}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Telefono"
                  name="phone"
                  autoComplete="phone"
                  variant="outlined"
                  size="small"
                />
                {errors && errors.phone && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.phone}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Celular"
                  name="mobile"
                  autoComplete="mobile"
                  variant="outlined"
                  size="small"
                />
                {errors && errors.mobile && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.mobile}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Persona de contacto"
                  name="contact"
                  autoComplete="contact"
                  variant="outlined"
                  size="small"
                />
                {errors && errors.contact && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.contact}
                  </Alert>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, padding: theme.spacing(1.5), fontSize: '1rem' }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2" sx={{ color: theme.palette.primary.main }}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Link href="/" variant="body2" sx={{ color: theme.palette.primary.main }}>
            {"Back"}
          </Link>
        </Box>
      </Container>
    </>
  );
}
