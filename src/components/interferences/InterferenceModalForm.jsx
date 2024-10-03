import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import { useInterferences } from "../../hooks/useInterferences";
import { InterferenceForm } from "./InterferenceForm";

export const InterferenceModalForm = () => {
  const theme = useTheme(); 
  const { interferenceSelected , handlerCloseInterferenceForm } = useInterferences();

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogTitle style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
        {interferenceSelected.id > 0 ? "Editar" : "Crear"} Interferencia
        <IconButton
          edge="end"
          style={{ color: theme.palette.primary.main }}
          onClick={handlerCloseInterferenceForm}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
        <InterferenceForm interferenceSelected={interferenceSelected} handlerCloseInterferenceForm={handlerCloseInterferenceForm} />
      </DialogContent>
    </Dialog>
  );
};

