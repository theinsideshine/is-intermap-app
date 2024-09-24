import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../auth/hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {UserRow} from "./UserRow"; // Make sure to import the UserRow component correctly
import { useMediaQuery } from "@mui/material";

export const UsersList = () => {
    const { users } = useUsers();
    const { login } = useAuth();

     // Verificar si es una vista móvil
     const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Users Table">
                <TableHead>
                    <TableRow>                        
                        <TableCell>Usuario</TableCell>
                        {!isMobile && <TableCell>email</TableCell>}
                        {!isMobile && <TableCell>rol</TableCell>}
                        {!login.isAdmin || (
                            <>
                                <TableCell>Editar</TableCell>
                                <TableCell>Borrar</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(({ 
                        id,
                        username,
                        role ,
                        cuit,
                        name,
                        address,
                        phone,
                        mobile,
                        contact,
                        email }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            role={role}
                            cuit={cuit}
                            name={name}
                            address={address}
                            phone={phone}
                            mobile={mobile}
                            contact={contact}
                            email={email}                            
                            isMobile={isMobile}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
