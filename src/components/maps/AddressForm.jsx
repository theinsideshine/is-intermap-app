import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Grid, Container, Box } from '@mui/material';
import { loadGoogleMaps } from '../../helpers/googleMapsLoader';

const AddressForm = ({ setCoordinates, setEmail, setAddress, setCompany, setIsValid }) => {
  const inputRef = useRef(null);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [companyError, setCompanyError] = useState('');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    setEmail(value);
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setCompanyValue(value);
    setCompany(value);
  };

  const handleSubmit = () => {
    let valid = true; // Variable para rastrear si el formulario es válido

    // Validar email
    if (!isValidEmail(emailValue)) {
      setEmailError('Email inválido');
      valid = false; // Marcar como no válido
    } else {
      setEmailError('');
    }

    // Validar empresa
    if (!companyValue.trim()) {
      setCompanyError('El nombre de la empresa no puede estar vacío');
      valid = false; // Marcar como no válido
    } else {
      setCompanyError('');
    }

    // Actualizar el estado de validación
    setIsValid(valid);

    // Si es válido, proceder con el envío de datos
    if (valid) {
      console.log('Formulario enviado');
      // Aquí puedes realizar otras acciones como enviar los datos a un servidor
    } else {
      console.log('Formulario no válido');
    }
  };

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["formatted_address", "geometry"],
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.geometry) {
          const { lat, lng } = place.geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
          setAddress(place.formatted_address);
        } else {
          console.error("No details available for input: '" + place.name + "'");
        }
      });
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [setCoordinates, setAddress]);

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {/* Dirección */}
          <Grid item xs={12}>
            <TextField
              inputRef={inputRef}
              fullWidth
              label="Ingrese la dirección"
              variant="outlined"
              size="small"
            />
          </Grid>

          {/* Empresa */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingrese la empresa"
              variant="outlined"
              size="small"
              value={companyValue}
              onChange={handleCompanyChange}
              error={!!companyError}
              helperText={companyError}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingrese su email"
              variant="outlined"
              size="small"
              value={emailValue}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit} // Llama a handleSubmit en el clic
        >
          Validar datos para crear interferencia
        </Button>
      </Box>
    </Container>
  );
};

export default AddressForm;
