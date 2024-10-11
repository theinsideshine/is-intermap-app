import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";



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
