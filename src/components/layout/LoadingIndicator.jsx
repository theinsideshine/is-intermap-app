import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

const LoadingIndicator = () => (
  <Container maxWidth="sm" sx={{ marginTop: 4 }}>
    <CircularProgress color="info" />
  </Container>
);

export default LoadingIndicator;
