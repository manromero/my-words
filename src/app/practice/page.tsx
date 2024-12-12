"use client";

import React, { useState } from "react";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";

import { usePractice } from "@/hooks";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import { WordList } from "@/components";
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
