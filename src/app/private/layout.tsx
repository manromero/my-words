"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/hooks";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  // TODO MANROMERO todo change to use css breakpoints: https://mui.com/system/display/#hiding-elements
  const mobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { signOut } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {mobile && (
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
          <Typography variant="h6" noWrap component="div">
            My Words
          </Typography>
          {mobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Logout"
              sx={{ marginLeft: "auto" }}
              onClick={signOut}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <Button
              color="inherit"
              sx={{ marginLeft: "auto" }}
              endIcon={<LogoutIcon />}
              onClick={signOut}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <DrawerMenu open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Config" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </DrawerMenu>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

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
