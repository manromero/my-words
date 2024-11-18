import React from "react";
import { Box, Modal as MaterialModal, SxProps, Theme } from "@mui/material";

type ModalType = {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  customSxBox?: SxProps<Theme> | undefined;
};

const style: SxProps<Theme> = {
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

export const Modal = ({
  children,
  open = false,
  onClose,
  customSxBox,
}: ModalType) => {
  return (
    <MaterialModal open={open} onClose={onClose}>
      <Box sx={{ ...style, ...customSxBox }}>{children}</Box>
    </MaterialModal>
  );
};
