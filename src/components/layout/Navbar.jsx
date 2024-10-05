import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import SearchIcon from "@mui/icons-material/Search";
import AlbumIcon from "@mui/icons-material/Album";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PeopleIcon from "@mui/icons-material/People";
import InterferenceIcon from "@mui/icons-material/Warning"; // Importa un icono para interferencias
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { useTheme, alpha } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, handlerLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const clickLogin = () => {
    navigate('/login');
  };

  const clickSignup = () => {
    navigate('/signup');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    // Aquí iría la lógica de búsqueda
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      handleSearchIconClick();
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}
    >
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" edge="start" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        {isMobile && (
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: theme.palette.text.primary, fontFamily: "'Courier New', Courier, monospace" }}
          >
            ISMap
          </Typography>
        )}

        <Hidden smDown>          

          <Button color="inherit" component={Link} to="/">
            Acerca de
          </Button>

          {(login.isAdmin || login.isSuperUser) && (
            <>
              <Button color="inherit" component={Link} to="/users">
                Usuarios
              </Button>
              <Button color="inherit" component={Link} to="/interferences">
                Interferencias
              </Button> {/* Nuevo botón para la página de interferencias */}
            </>
          )}
        </Hidden>

        <div style={{ flexGrow: 1 }} />

        <Hidden smDown>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Courier New', Courier, monospace",
              textAlign: "center",
            }}
          >
            ISMap
          </Typography>
        </Hidden>

        <div style={{ flexGrow: 1 }} />

        <Hidden mdUp>
          <Drawer anchor="left" open={menuOpen} onClose={closeMenu}>
            <List sx={{ width: "250px", bgcolor: theme.palette.background.paper }}>
              {login.isAdmin && ( 
                <>
                  
                  <ListItem button component={Link} to="/users" onClick={closeMenu}>
                    <ListItemIcon>
                      <PeopleIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" sx={{ color: theme.palette.text.primary }} />
                  </ListItem>
                  <ListItem button component={Link} to="/interferences" onClick={closeMenu}>
                    <ListItemIcon>
                      <InterferenceIcon sx={{ color: theme.palette.primary.main }} /> {/* Icono para interferencias */}
                    </ListItemIcon>
                    <ListItemText primary="Interferencias" sx={{ color: theme.palette.text.primary }} />
                  </ListItem>
                </>
              )}
            </List>
            <ListItem button component={Link} to="/" onClick={closeMenu}>
              <ListItemIcon>
                <CloudUploadIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Acerca de" sx={{ color: theme.palette.text.primary }} />
            </ListItem>
          </Drawer>
        </Hidden>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
              marginRight: theme.spacing(2),
              marginLeft: 0,
              width: "auto",
            }}
          >
            <div
              style={{
                padding: theme.spacing(0, 2),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar…"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
              sx={{
                color: "inherit",
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create("width"),
                width: "12ch",
                "&:focus": { width: "20ch" },
              }}
            />
          </div>

          <Typography
            variant="body1"
            color="text.primary"
            sx={{ marginRight: "10px", fontFamily: "'Courier New', Courier, monospace" }}
          >
            {login.user?.username} 
          </Typography>
          {login.user?.username ? (
            <IconButton color="inherit" onClick={handlerLogout}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <>
              <IconButton color="inherit" onClick={clickLogin}>
                <LoginIcon />
              </IconButton> 
              <IconButton color="inherit" onClick={clickSignup}>
                <AppRegistrationIcon />
              </IconButton> 
            </>
          )}  
        </div>
      </Toolbar>
    </AppBar>
  );
};
