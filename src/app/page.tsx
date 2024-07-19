"use client";
import React from "react";
import Divider from "@mui/material/Divider";

import { useAuth } from "@/hooks";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const AppPage = () => {
  const { signInWithGoogle, signInWithFacebook, loading } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="30vh"
      gap={2}
    >
      {loading && (
        <>
          <Box width="90%">
            <LinearProgress />
          </Box>
        </>
      )}
      {!loading && (
        <>
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
          <Button
            startIcon={<FacebookIcon />}
            variant="contained"
            color="primary"
            onClick={signInWithFacebook}
          >
            SignIn With Facebook
          </Button>
        </>
      )}
    </Box>
  );
};

export default AppPage;
