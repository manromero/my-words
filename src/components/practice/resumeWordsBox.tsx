import React from "react";

import Typography from "@mui/material/Typography";

import { Box } from "@mui/material";

import NumbersIcon from "@mui/icons-material/Numbers";

type ResumeWordBoxType = {
  words: number;
};

export const ResumeWordBox = ({ words }: ResumeWordBoxType) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ background: "#a76df1", borderRadius: 2, padding: "3px" }}
      flexBasis={0}
      flexGrow={1}
      flexShrink={0}
    >
      <Box sx={{ padding: 2, paddingTop: 1, paddingBottom: 1 }} flexGrow={1}>
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
          {words}
        </Typography>
      </Box>
    </Box>
  );
};
