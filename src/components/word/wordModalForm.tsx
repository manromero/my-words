import React from "react";
import { WordType } from "@/types";
import { Box, IconButton, Modal } from "@mui/material";
import { WordForm } from "./wordForm";

import CloseIcon from "@mui/icons-material/Close";

type WordModalFormType = {
  word?: WordType;
  onClose?: () => void;
  onCreate?: (word: WordType) => void;
  onEdit?: (word: WordType) => void;
  onDelete?: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const WordModalForm = (props: WordModalFormType) => {
  return (
    <Modal open={props.word !== undefined} onClose={props.onClose}>
      <Box sx={style}>
        <IconButton
          color="primary"
          aria-label="Close Modal"
          onClick={props.onClose}
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon />
        </IconButton>
        <WordForm
          word={props.word}
          onCreate={props.onCreate}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      </Box>
    </Modal>
  );
};
