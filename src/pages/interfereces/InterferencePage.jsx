import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useNavigate
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { CssBaseline } from "@mui/material";

import { InterferencesList } from "../../components/interferences/InterferencesList";
import { useInterferences } from "../../hooks/useInterferences";
import { Paginator } from "../../components/shared/Paginator";
import LoadingIndicator from "../../components/layout/LoadingIndicator";
import { useAuth } from "../../auth/hooks/useAuth";
import { InterferenceModalForm } from "../../components/interferences/InterferenceModalForm";

export const InterferencePage = () => {
    const { page } = useParams();
    const navigate = useNavigate(); // Definir useNavigate
    const {
        interferences,
        visibleForm,
        isLoading,
        paginator,
        handlerOpenInterferenceForm,
        getInterferences,
    } = useInterferences();

    const { login } = useAuth();

    useEffect(() => {
        getInterferences(page);
    }, [page]);

    // Manejar la navegación al hacer clic en "Nueva Interferencia"
    const handleNewInterference = () => {
        navigate("/intercheck"); // Navegar a /intercheck
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <CssBaseline />
            {!visibleForm || <InterferenceModalForm />}
            <Container maxWidth="xl" sx={{ marginTop: 4 }}>
                <div className="row">
                    <div className="col">
                        {(visibleForm ) || (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ my: 2 }}
                                onClick={handleNewInterference} // Cambiar el handler
                            >
                                Nueva Interferencia
                            </Button>
                        )}

                        {interferences.length === 0 ? (
                            <Alert severity="warning">No hay interferencias en el sistema!</Alert>
                        ) : (
                            <>
                                <InterferencesList />
                                <Paginator url="/interferences/page" paginator={paginator} />
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};
