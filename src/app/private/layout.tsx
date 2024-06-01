"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useAuth } from "@/hooks";
import { DrawerMenu, LogoutButton, MenuButton, MenuItem } from "@/components";
import { MENU_ITEMS } from "@/routes";
import { DataProvider } from "@/context";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { signOut } = useAuth();

  return (
    <DataProvider>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            {/* Only visible in Mobile */}
            <MenuButton onClick={() => setOpenDrawer(!openDrawer)} />
            <Typography variant="h6" noWrap component="div">
              My Words
            </Typography>
            <LogoutButton onClick={signOut} />
          </Toolbar>
        </AppBar>
        <DrawerMenu open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {MENU_ITEMS.filter((r) => r.primarySection).map((route) => (
                <MenuItem key={route.label} {...route} />
              ))}
            </List>
            <Divider />
            <List>
              {MENU_ITEMS.filter((r) => r.secondarySection).map((route) => (
                <MenuItem key={route.label} {...route} />
              ))}
            </List>
          </Box>
        </DrawerMenu>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </DataProvider>
  );
}
