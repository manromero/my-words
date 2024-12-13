"use client";

import React, { useState } from "react";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";

import { usePractice } from "@/hooks";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  WordList,
  ResumeAccuracyBox,
  ResumeTimeBox,
  ResumeWordBox,
} from "@/components";

export const PlayResume = () => {
  const { restart } = usePractice();
  const [showWords, setShowWords] = useState(false);

  const handleShowWords = () => {
    setShowWords(true);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={3}
      width={{ xs: "90%", lg: "60%" }}
      padding={{ xs: "5vh 5%", lg: "5vh 20%" }}
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
        width="100%"
      >
        <ResumeWordBox words={100} />
        <ResumeTimeBox time={100} />
        <ResumeAccuracyBox accuracy={100} />
      </Box>

      {!showWords && (
        <Button
          variant="outlined"
          color="primary"
          type="button"
          sx={{ width: "100%" }}
          onClick={handleShowWords}
        >
          Show Words
        </Button>
      )}

      <Collapse in={showWords} sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            fontWeight="900"
            color="#d32f2f"
          >
            Errors
          </Typography>
          <WordList
            words={[
              { word: "test", translation: "test", tags: ["test"] },
              { word: "test", translation: "test", tags: ["test"] },
            ]}
            tags={[{ id: "test", label: "test" }]}
          />
          <Typography
            variant="h5"
            component="h4"
            fontWeight="900"
            color="#84cf31"
          >
            Success
          </Typography>
          <WordList
            words={[
              { word: "test", translation: "test", tags: ["test"] },
              { word: "test", translation: "test", tags: ["test"] },
            ]}
            tags={[{ id: "test", label: "test" }]}
          />
        </Box>
      </Collapse>

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
