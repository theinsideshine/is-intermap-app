import React from "react";
import { useInterferences } from "../../hooks/useInterferences";
import { useAuth } from "../../auth/hooks/useAuth";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from '@mui/material/styles'; // Importa useTheme

export const InterferenceRow = ({ 
    id,
    username,
    email,
    company,
    isMobile
}) => {
    const theme = useTheme(); // Obtiene el tema personalizado
    const { handlerInterferenceSelectedForm, handlerRemoveInterference } = useInterferences();
    const { login } = useAuth();

    return (
        <TableRow>
            <TableCell>{username}</TableCell>
            {!isMobile && <TableCell>{email}</TableCell>}
            {!isMobile && <TableCell>{company}</TableCell>}

            {!login.isAdmin || (
                <>
                    <TableCell>
                        <IconButton
                            size="small"
                            style={{ color: theme.palette.primary.main }}
                            onClick={() =>
                                handlerInterferenceSelectedForm({
                                    id,
                                    username,
                                    email,
                                    company
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
