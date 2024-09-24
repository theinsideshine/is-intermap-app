import React from "react";
import { useInterferences } from "../../hooks/useInterferences";
import { useAuth } from "../../auth/hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InterferenceRow } from "./InterferenceRow"; // Asegúrate de importar correctamente el componente InterferenceRow
import { useMediaQuery } from "@mui/material";

export const InterferencesList = () => {
    const { interferences } = useInterferences();
    const { login } = useAuth();

    // Verificar si es una vista móvil
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Interferences Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        {!isMobile && <TableCell>Email</TableCell>}
                        {!isMobile && <TableCell>Empresa</TableCell>}
                        {!login.isAdmin || (
                            <>
                                <TableCell>Editar</TableCell>
                                <TableCell>Borrar</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {interferences.map(({ 
                        id,
                        username,
                        email,
                        company
                    }) => (
                        <InterferenceRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            company={company}
                            isMobile={isMobile}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
