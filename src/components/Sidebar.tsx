import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AppBar, DrawerHeader, drawerWidth, Main } from "../styles/sideBar";
import { useAuth } from "../context/AuthProvider";

export default function Sidebar({ listRoutes }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(0);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    localStorage.removeItem("user");
    setAuth({ token: "", roles: [], username: "" });
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listRoutes
            .filter(
              (route: any) =>
                route.showInNav === true && route.role === auth.roles.toString()
            )
            .map((route: any) => {
              return (
                <ListItem key={route.key} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(route.path);
                      handleDrawerClose();
                      setActiveKey(route.key);
                    }}
                  >
                    {activeKey === route.key ? (
                      <Box
                        sx={{
                          backgroundColor: "#f5f5f5",
                          borderRadius: 2,
                          padding: 0.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.name} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          borderRadius: 5,
                          padding: 0.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.name} />
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          <ListItem>
            <ListItemButton onClick={handleExit}>
              <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
              <ListItemText>خروج</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
