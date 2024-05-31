import * as React from "react";

import { Button, IconButton } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

type LogoutButtonType = {
  onClick?: () => void;
};

export const LogoutButton = (props: LogoutButtonType) => {
  return (
    <>
      {/* Mobile */}
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="Logout"
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
          marginLeft: "auto",
        }}
        onClick={props.onClick}
      >
        <LogoutIcon />
      </IconButton>
      {/* Desktop */}
      <Button
        color="inherit"
        sx={{
          display: {
            xs: "none",
            lg: "flex",
          },
          marginLeft: "auto",
        }}
        endIcon={<LogoutIcon />}
        onClick={props.onClick}
      >
        Logout
      </Button>
    </>
  );
};
