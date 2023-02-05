import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Cookies from "universal-cookie";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, DrawerHeader, drawerWidth, Main } from "../styles/sideBar";
import { useAuth } from "../context/AuthProvider";
import { Menu, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoWithName from "../assets/logoWithName.png";
import style from "../styles/search/searchChevron.module.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Face6Icon from "@mui/icons-material/Face6";
import LogoLight from "./LogoLightSVG";

export default function Sidebar({ listRoutes }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const roleUser = auth.roles.toString();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const cookie = new Cookies();

  const handleExit = () => {
    handleClose();
    cookie.remove("token");
    setAuth({ roles: [], username: "" });
    navigate("/");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigateProfilePage = () => {
    handleClose();
    navigate(`${roleUser}/profile`);
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
          <Box
            // component={"img"}
            // src={logoWithName}
            // alt={"kaaryar logo"}
            sx={{
              mr: 5,
              width: "8rem",
              height: "auto",
              ...(open && { display: "none" }),
            }}
          >
            <LogoLight />
          </Box>
          <Typography variant="subtitle2">
            سامانه مدیریت پروفایل کاریار
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <ExpandMoreIcon
                  className={anchorEl ? style.rotate180 : style.rotate0}
                />
              </IconButton>
              <Typography sx={{ mr: 1 }}>{auth.username}</Typography>
              <AccountCircle />
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <ListItemIcon sx={{ marginRight: 1 }}>
                  {roleUser === "admin" ? (
                    <AdminPanelSettingsIcon />
                  ) : (
                    <Face6Icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  secondary={`نقش شما:
                  ${
                    roleUser === "admin"
                      ? "ادمین"
                      : roleUser === "mentor"
                      ? "منتور"
                      : "مربی حل تمرین"
                  }`}
                />
              </MenuItem>
              <MenuItem onClick={handleNavigateProfilePage}>
                <ListItemIcon sx={{ marginRight: 1 }}>
                  {<AccountCircle />}
                </ListItemIcon>
                <ListItemText secondary="پروفایل کاربری" />
              </MenuItem>
              <Divider variant="middle" />
              <MenuItem onClick={handleExit}>
                <ListItemIcon sx={{ rotate: "180deg", mr: 1 }}>
                  {<LogoutIcon />}
                </ListItemIcon>
                <ListItemText secondary="خروج" />
              </MenuItem>
            </Menu>
          </Box>
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
                route.showInNav === true && route.role === roleUser
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
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
