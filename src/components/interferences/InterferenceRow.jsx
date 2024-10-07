import React from "react";
import { useInterferences } from "../../hooks/useInterferences";
import { useAuth } from "../../auth/hooks/useAuth";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useTheme } from '@mui/material/styles'; // Importa useTheme
import { useNavigate } from "react-router-dom";
import { updateKmlDataInSessionStorage } from "../../helpers/storageHelper";

export const InterferenceRow = ({ 
    id,
    username,
    company,
    address_ref,
    email,
    point_reference,     
    start,                        
    last,
    status,    
    url_file,
    interference,
    isMobile
}) => {
    const theme = useTheme(); // Obtiene el tema personalizado
    const { handlerInterferenceSelectedForm, handlerRemoveInterference } = useInterferences();
    const { login } = useAuth();
    const navigate = useNavigate(); // Definir useNavigate

    const handlerViewInterference = (id) => {
        if (point_reference && point_reference.length === 2) {
            const pointObject = {
                lat: point_reference[0],  // La latitud viene en la primera posición de la lista
                lng: point_reference[1],  // La longitud viene en la segunda posición de la lista
            };
            
            // Guarda el objeto en sessionStorage con el formato correcto
            updateKmlDataInSessionStorage(url_file, pointObject);
    
            console.log('Ruta guardada en session ', url_file);
            console.log('Point references guardado en session ', pointObject);
        } else {
            console.error('Point reference no tiene el formato esperado');
        }
    
        navigate(`/viewkml/view/${id}`);
    };
     console.log("login.isAdmin",login.isAdmin);
     console.log("login.isUser",login.isUser);

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            {!isMobile && <TableCell>{company}</TableCell>}
            {!isMobile && <TableCell>{address_ref}</TableCell>}
            {!isMobile && <TableCell>{interference ? "Si" : "No"}</TableCell>}
            {!isMobile && <TableCell>{status}</TableCell>}
            {!isMobile && (
                <TableCell>
                    {new Date(last).toLocaleDateString('en-CA', { timeZone: 'UTC' })}
                </TableCell>
            )}
            {!isMobile && (
                <TableCell>
                    {new Date(start).toLocaleDateString('en-CA', { timeZone: 'UTC' })}
                </TableCell>
            )}

            {(login.isAdmin || login.isUser) && (  // Cambiado a login.isAdmin para permitir acceso solo a admin
                <>
                    <TableCell>
                        <IconButton
                            size="small"
                            style={{ color: theme.palette.primary.main }}
                            onClick={() => handlerViewInterference(id)}
                        >
                            <FindInPageIcon />
                        </IconButton>
                    </TableCell>

                    <TableCell>
                        <IconButton
                            size="small"
                            style={{ color: theme.palette.primary.main }}
                            onClick={() =>
                                handlerInterferenceSelectedForm({
                                    id,
                                    username,
                                    company,
                                    address_ref,
                                    email,
                                    point_reference,
                                    start,
                                    last,
                                    status,
                                    url_file,
                                    interference,
                                })
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    </TableCell>

                    <TableCell>
                        <IconButton
                            size="small"
                            style={{ color: theme.palette.primary.main }}
                            onClick={() => handlerRemoveInterference(id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
};

