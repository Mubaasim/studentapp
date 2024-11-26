import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <SignUpForm />
      </Paper>
    </Container>
  );
};

export default SignUpPage;
