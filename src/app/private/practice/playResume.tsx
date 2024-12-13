"use client";

import React, { useState } from "react";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";

import { usePractice } from "@/hooks";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  ResumeAccuracyBox,
  ResumeTimeBox,
  ResumeWordBox,
  WordList,
} from "@/components";

export const PlayResume = () => {
  const { restart, resume } = usePractice();
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
      width="100%"
      marginTop={2}
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
        <ResumeWordBox words={resume.wordsLength} />
        <ResumeTimeBox time={resume.timeExpended} />
        <ResumeAccuracyBox accuracy={resume.accuracy} />
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
