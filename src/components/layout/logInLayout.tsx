"use client";

import Box from "@mui/material/Box";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export const LoginLayout = (props: React.PropsWithChildren) => {
  const theme = useTheme();
  const tabletOrDown = useMediaQuery(theme.breakpoints.down("lg"));
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {tabletOrDown && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Words
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div>Menu item</div>
        <div>Menu item</div>
        <div>Menu item</div>
        <div>Menu item</div>
      </Drawer>
      <Box padding={1}>{props.children}</Box>
    </>
  );
};
