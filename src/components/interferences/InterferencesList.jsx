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
                        <TableCell>Solicitud</TableCell>
                        {!isMobile && <TableCell>Empresa</TableCell>}
                        {!isMobile && <TableCell>Direccion</TableCell>}
                        {!isMobile && <TableCell>Inteferencia</TableCell>}
                        {!isMobile && <TableCell>Estado</TableCell>}
                        {!isMobile && <TableCell>Ultimo cambio</TableCell>}
                        {!isMobile && <TableCell>Inicio</TableCell>}
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
                        company ,
                        address_ref,
                        email,
                        point_reference,                       
                        start,                        
                        last,
                        status,
                        url_file,
                        interference

                    }) => (
                        <InterferenceRow
                            key={id}
                            id={id}
                            username={username}
                            company={company}
                            address_ref={address_ref}
                            email={email}  
                            point_reference={point_reference}                                                      
                            start={start}
                            last={last}
                            status={status}                            
                            url_file={url_file}
                            interference={interference}                                                     
                            isMobile={isMobile}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
