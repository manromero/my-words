import * as React from "react";
import NextLink from "next/link";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type MenuItemType = {
  label: string;
  icon: React.JSX.Element;
  path: string;
};

export const MenuItem = (props: MenuItemType) => {
  return (
    <ListItem>
      <ListItemButton href={props.path} LinkComponent={NextLink}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  );
};
