import React from "react";

import Typography from "@mui/material/Typography";

import { Modal } from "../commons";
import { Button, Stack } from "@mui/material";

type GoToResumeModalType = {
  open?: boolean;
  title?: string;
  onGoToResume?: () => void;
};

export const GoToResumeModal = ({
  open,
  title,
  onGoToResume,
}: GoToResumeModalType) => {
  return (
    <Modal open={open} customSxBox={{ width: { xs: "95%", lg: "40%" } }}>
      <Stack direction="column" alignItems="center" padding={7}>
        {title && (
          <Typography variant="h3" component="h2">
            {title}
          </Typography>
        )}
        <Button
          variant="contained"
          size="large"
          color="info"
          sx={{ marginTop: 5 }}
          onClick={onGoToResume}
        >
          Go to resume
        </Button>
      </Stack>
    </Modal>
  );
};
