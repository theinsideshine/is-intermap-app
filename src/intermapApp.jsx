import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRoutes } from './AppRoutes'; 
import { Provider } from 'react-redux';
import { store } from './store/store';

const theme = createTheme({
  palette: {
    background: {
      default: '#282831',
      paper: '#252231',
    },
    text: {
      primary: '#CDC8C8',
      secondary: '#008A90',
    },
    primary: {
      main: '#008A90',
    },
    secondary: {
      main: '#009074',
    },
  },
  typography: {
    fontFamily: 'Mooli, sans-serif',
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: 'Lato, sans-serif',
    },
    button: {
      fontFamily: 'Mooli, sans-serif',
    },
  },
});

export const IntermapApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
          a: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              color: theme.palette.primary.dark,
            },
          },
        }}
      />
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </ThemeProvider>
  );
};
