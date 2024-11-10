import React from "react";
import { Box, Modal as MaterialModal } from "@mui/material";

type ModalType = {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", lg: "60%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const Modal = ({ children, open = false, onClose }: ModalType) => {
  return (
    <MaterialModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MaterialModal>
  );
};
