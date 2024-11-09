import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";

import SaveIcon from "@mui/icons-material/Save";

import React from "react";

type WordFormFooterType = {
  disableSave?: boolean;
  disableDelete?: boolean;
  onDeleteClick?: React.MouseEventHandler;
};

export const WordFormFooter = ({
  disableSave,
  disableDelete,
  onDeleteClick,
}: WordFormFooterType) => {
  return (
    <Stack
      direction={{ sx: "column", lg: "row" }}
      justifyContent="flex-end"
      boxShadow="0px -5px 4px -2px rgba(0, 0, 0, 0.2)"
      gap={2}
      paddingTop={2}
    >
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        disabled={disableDelete}
        onClick={onDeleteClick}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        color="primary"
        type="submit"
        disabled={disableSave}
      >
        Save
      </Button>
    </Stack>
  );
};
