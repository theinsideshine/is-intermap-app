import React from "react";
import { useInterferences } from "../../hooks/useInterferences";
import { useAuth } from "../../auth/hooks/useAuth";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from '@mui/material/styles'; // Importa useTheme


export const InterferenceDetailRow = ({ 
    id,
    username,
    company ,
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

           
        </TableRow>
    );
};
