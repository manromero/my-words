import React from "react";

import Typography from "@mui/material/Typography";

import { Box } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

type ResumeTimeBoxType = {
  time: number;
};

export const ResumeTimeBox = ({ time }: ResumeTimeBoxType) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ background: "#6ea9f1", borderRadius: 2, padding: "3px" }}
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
          {time}s
        </Typography>
      </Box>
    </Box>
  );
};
