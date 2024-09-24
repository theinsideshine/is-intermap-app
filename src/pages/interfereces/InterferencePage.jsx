import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { CssBaseline } from "@mui/material";

import { InterferenceForm } from "../../components/interferences/InterferenceForm";
import { InterferencesList } from "../../components/interferences/InterferencesList";
import { useInterferences } from "../../hooks/useInterferences";
import { Paginator } from "../../components/shared/Paginator";
import LoadingIndicator from "../../components/layout/LoadingIndicator";
import { useAuth } from "../../auth/hooks/useAuth";

export const InterferencePage = () => {
    const { page } = useParams();
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

    if (isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <>  
            <CssBaseline />
            {!visibleForm || <InterferenceForm />}
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ my: 2 }}
                                onClick={handlerOpenInterferenceForm}
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
