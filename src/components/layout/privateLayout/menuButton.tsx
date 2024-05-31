import * as React from "react";

import { IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

type MenuButtonType = {
  onClick?: () => void;
};

export const MenuButton = (props: MenuButtonType) => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{
        display: {
          xs: "block",
          lg: "none",
        },
        mr: 2,
      }}
      onClick={props.onClick}
    >
      <MenuIcon />
    </IconButton>
  );
};
