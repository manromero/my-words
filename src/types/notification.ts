import { AlertColor } from "@mui/material";

export type NotificationType = {
  id?: number;
  severity?: AlertColor;
  message: string;
};
