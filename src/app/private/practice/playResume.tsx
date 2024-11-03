"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";

import { usePractice } from "@/hooks";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const PlayResume = () => {
  const { restart } = usePractice();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop="15%"
    >
      <Typography variant="h2" component="h2">
        Great Job!
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="info"
        startIcon={<RestartAltIcon />}
        sx={{ marginTop: 5 }}
        onClick={restart}
      >
        Play Again
      </Button>
    </Stack>
  );
};
