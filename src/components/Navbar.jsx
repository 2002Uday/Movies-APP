import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { getToken, removeToken, isAdmin } from "../auth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoggin = getToken();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin();
      setIsAdminUser(admin);
    };
    checkAdmin();
  }, []);

  console.log(isAdminUser);

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  const navItems = [
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Movies-App
      </Typography>
      <List>
        {isAdminUser && (
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              to={"/movie/add"}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <Button variant="contained">{"Add New Movie"}</Button>
            </Link>
          </ListItemButton>
        )}
        {!isLoggin ? (
          navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <Button variant="contained" sx={{ width: 200 }}>
                    {item.label}
                  </Button>
                </Link>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#222" }}>
        <Toolbar>
          {/* Navbar Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Movies-App
            </Link>
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isAdminUser && (
              <Link
                to={"/movie/add"}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Button variant="contained">{"Add New Movie"}</Button>
              </Link>
            )}
            {!isLoggin ? (
              navItems.map((item) => (
                <Link
                  to={item.path}
                  key={item.label}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    marginRight: "16px",
                  }}
                >
                  <Button variant="contained">{item.label}</Button>
                </Link>
              ))
            ) : (
              <Button variant="contained" onClick={handleLogout} sx={{ ml: 2 }}>
                Logout
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
