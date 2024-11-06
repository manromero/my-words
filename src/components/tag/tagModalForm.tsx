import React from "react";
import { TagType } from "@/types";
import { Box, IconButton, Modal } from "@mui/material";
import { TagForm } from "./tagForm";

import CloseIcon from "@mui/icons-material/Close";

type TagModalFormType = {
  tag?: TagType;
  onClose?: () => void;
  onCreate?: (tag: TagType) => void;
  onEdit?: (tag: TagType) => void;
  onDelete?: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const TagModalForm = (props: TagModalFormType) => {
  return (
    <Modal open={props.tag !== undefined} onClose={props.onClose}>
      <Box sx={style}>
        <IconButton
          color="primary"
          aria-label="Close Modal"
          onClick={props.onClose}
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon />
        </IconButton>
        <TagForm
          tag={props.tag}
          onCreate={props.onCreate}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      </Box>
    </Modal>
  );
};
