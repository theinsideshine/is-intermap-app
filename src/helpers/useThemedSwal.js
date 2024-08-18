import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles';

const useThemedSwal = () => {
  const theme = useTheme();

  const ThemedSwal = Swal.mixin({
    customClass: {
      confirmButton: 'swal2-confirm',
      cancelButton: 'swal2-cancel'
    },
    buttonsStyling: false
  });

  const applyTheme = () => {
    const styles = `
      .swal2-confirm {
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        border: none;
        border-radius: ${theme.shape.borderRadius}px;
        padding: 0.5rem 1rem;
        font-family: ${theme.typography.button.fontFamily};
      }
      .swal2-cancel {
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.contrastText};
        border: none;
        border-radius: ${theme.shape.borderRadius}px;
        padding: 0.5rem 1rem;
        font-family: ${theme.typography.button.fontFamily};
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  };

  applyTheme();

  return ThemedSwal;
};

export default useThemedSwal;
