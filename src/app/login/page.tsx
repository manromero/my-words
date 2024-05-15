"use client";
import React from "react";
import Divider from "@mui/material/Divider";

import { useAuth } from "@/hooks";
import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const LoginForm = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="30vh"
      gap={2}
    >
      <Typography variant="h4" component="h1">
        Welcome to MyWords
      </Typography>
      <Box width="90%">
        <Divider textAlign="center">
          Use one of the next providers to Sign In
        </Divider>
      </Box>
      <Button
        startIcon={<GoogleIcon />}
        variant="contained"
        color="error"
        onClick={signInWithGoogle}
      >
        SignIn With Google
      </Button>
    </Box>
  );
};

export default LoginForm;
