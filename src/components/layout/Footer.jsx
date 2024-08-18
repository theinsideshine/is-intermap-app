import React from 'react';
import Box from '@mui/material/Box';


import { CopyrightRight } from './FooterCopyright';


export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
    
      <CopyrightRight sx={{ mt: 5 }} />
      
    </Box>
  );
};
