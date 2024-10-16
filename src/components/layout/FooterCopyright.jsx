import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function CopyrightRight(props) {
    return (
      <Typography variant="body2" color="text.primary" align="center" {...props}>
         <Link color="inherit" href="https://github.com/theinsideshine/is-intermap-back" variant="body2">
          GitHub/BackEnd
        </Link>{' '}
        {'-Copyright © '}
        <Link color="inherit" href="https://www.youtube.com/channel/UClLTMbxqK8LLSWm4bOdyx5Q" variant="body2">
          The inside shine
        </Link>{' '}
        {new Date().getFullYear()}
        {'-'}
        <Link color="inherit" href="https://github.com/theinsideshine/is-intermap-app" variant="body2">
          GitHub/FrontEnd 
        </Link>{'-'}
        <Link color="inherit" href="https://www.youtube.com/watch?v=oUnR56ElMRo" variant="body2">
          Prueba de concepto
        </Link>{'-'}
        <Link color="inherit" href="https://www.youtube.com/watch?v=aS63uaGUTG0" variant="body2">
          Sistema de login
        </Link>{' '}
        <Link color="inherit" href="https://www.youtube.com/watch?v=O1qhujz8PV0" variant="body2">
          Demo1
        </Link>{' '}

        
      </Typography>
    );
  }