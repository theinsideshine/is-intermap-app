import React, { useEffect, useState } from "react";
import { useInterferences } from "../../hooks/useInterferences";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InterferenceDetailRow } from "./InterferenceDetailRow";
import { useMediaQuery } from "@mui/material";

export const InterferencesDetailList = ({ id }) => {
    const { interferences = [], initialInterferenceForm } = useInterferences();    
    const [interferenceSelected, setInterferenceSelected] = useState(initialInterferenceForm);

    // Verificar si es una vista móvil
    const isMobile = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        console.log('En viewKmlPage = ' + id);
        if (id) {
            const interference = interferences.find(a => a.id === id) || initialInterferenceForm;
            setInterferenceSelected(interference);
        }
    }, [id,initialInterferenceForm,interferences]);
 
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Interferences Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Solicitud</TableCell>
                        {!isMobile && <TableCell>Empresa</TableCell>}
                        {!isMobile && <TableCell>Direccion</TableCell>}
                        {!isMobile && <TableCell>Interferencia</TableCell>}
                        {!isMobile && <TableCell>Estado</TableCell>}
                        {!isMobile && <TableCell>Ultimo cambio</TableCell>}
                        {!isMobile && <TableCell>Inicio</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {id !== 0 && (
                        <InterferenceDetailRow
                            key={interferenceSelected.id}
                            id={interferenceSelected.id}
                            username={interferenceSelected.username}
                            company={interferenceSelected.company}
                            address_ref={interferenceSelected.address_ref}
                            email={interferenceSelected.email}
                            point_reference={interferenceSelected.point_reference}
                            start={interferenceSelected.start}
                            last={interferenceSelected.last}
                            status={interferenceSelected.status}
                            url_file={interferenceSelected.url_file}
                            interference={interferenceSelected.interference}
                            isMobile={isMobile}
                        />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
