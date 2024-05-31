import * as React from "react";
import Drawer from "@mui/material/Drawer";

type DrawerMenuType = {
  open?: boolean;
  onClose?: () => void;
};

export const DrawerMenu = (props: React.PropsWithChildren<DrawerMenuType>) => {
  return (
    <>
      {/* Drawer Mobile */}
      <Drawer
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
          width: "100%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "100%",
            boxSizing: "border-box",
          },
        }}
        open={props.open}
        onClose={props.onClose}
      >
        {props.children}
      </Drawer>
      {/* Drawer Desktop */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          display: {
            xs: "none",
            lg: "block",
          },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        open={props.open}
        onClose={props.onClose}
      >
        {props.children}
      </Drawer>
    </>
  );
};
