"use client";

import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { usePractice } from "@/hooks";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
export const PlayResume = () => {
  const { restart } = usePractice();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop="15%"
      gap={2}
    >
      <Typography
        variant="h3"
        component="h2"
        color="#edd13d"
        fontWeight="900"
        textAlign="center"
      >
        Practice Completed!
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={2}
        alignItems="stretch"
        width={{ xs: "80%", lg: "60%" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ background: "#a76df1", borderRadius: 2, padding: "3px" }}
          flexBasis={0}
          flexGrow={1}
          flexShrink={0}
        >
          <Box
            sx={{ padding: 2, paddingTop: 1, paddingBottom: 1 }}
            flexGrow={1}
          >
            <Typography
              variant="body1"
              component="h4"
              textAlign="center"
              color="white"
              fontWeight="900"
            >
              Words
            </Typography>
          </Box>
          <Box
            sx={{ background: "#ffffff", padding: 2, borderRadius: 2 }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <NumbersIcon htmlColor="#a76df1" fontWeight="900" />
            <Typography
              variant="h5"
              component="h4"
              textAlign="center"
              fontWeight="900"
              color="#a76df1"
            >
              100
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          sx={{ background: "#6ea9f1", borderRadius: 2, padding: "3px" }}
          flexBasis={0}
          flexGrow={1}
          flexShrink={0}
        >
          <Box
            sx={{ padding: 2, paddingTop: 1, paddingBottom: 1 }}
            flexGrow={1}
          >
            <Typography
              variant="body1"
              component="h4"
              textAlign="center"
              color="white"
              fontWeight="900"
            >
              Time
            </Typography>
          </Box>
          <Box
            sx={{ background: "#ffffff", padding: 2, borderRadius: 2 }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <AccessTimeIcon htmlColor="#6ea9f1" fontWeight="900" />
            <Typography
              variant="h5"
              component="h4"
              textAlign="center"
              fontWeight="900"
              color="#6ea9f1"
            >
              100s
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          sx={{ background: "#84cf31", borderRadius: 2, padding: "3px" }}
          flexBasis={0}
          flexGrow={1}
          flexShrink={0}
        >
          <Box
            sx={{ padding: 2, paddingTop: 1, paddingBottom: 1 }}
            flexGrow={1}
          >
            <Typography
              variant="body1"
              component="h4"
              textAlign="center"
              color="white"
              fontWeight="900"
            >
              Accuracy
            </Typography>
          </Box>
          <Box
            sx={{ background: "#ffffff", padding: 2, borderRadius: 2 }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="5px"
          >
            <FlagIcon htmlColor="#84cf31" fontWeight="900" />
            <Typography
              variant="h5"
              component="h4"
              textAlign="center"
              fontWeight="900"
              color="#84cf31"
            >
              100
            </Typography>
          </Box>
        </Box>
      </Box>

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

export default PlayResume;
