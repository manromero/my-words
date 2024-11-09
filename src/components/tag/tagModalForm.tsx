import React from "react";
import { TagType } from "@/types";
import { Box, Modal } from "@mui/material";
import { TagForm } from "./tagForm";

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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const TagModalForm = (props: TagModalFormType) => {
  return (
    <Modal open={props.tag !== undefined} onClose={props.onClose}>
      <Box sx={style}>
        <TagForm
          tag={props.tag}
          onCreate={props.onCreate}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          onClose={props.onClose}
        />
      </Box>
    </Modal>
  );
};
