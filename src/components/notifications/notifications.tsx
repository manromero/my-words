import * as React from "react";
import { useNotifications } from "@/hooks";
import { Alert, Snackbar } from "@mui/material";

export const Notifications = () => {
  const { notification, deleteNotification } = useNotifications();

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    deleteNotification();
  };
  return (
    <Snackbar
      open={notification !== undefined}
      onClose={handleSnackbarClose}
      autoHideDuration={5000}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={notification?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};
