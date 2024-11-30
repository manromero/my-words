"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";

import { usePractice } from "@/hooks";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const PlayError = () => {
  const { restart } = usePractice();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop="20%"
      gap={2}
    >
      <Typography variant="h4" component="h2" textAlign="center">
        The selecter filter does not have enought words
      </Typography>
      <Typography variant="h4" component="h2" textAlign="center">
        Select another one
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="info"
        startIcon={<RestartAltIcon />}
        onClick={restart}
      >
        Try Again
      </Button>
    </Stack>
  );
};
