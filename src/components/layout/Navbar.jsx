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
  
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PeopleIcon from "@mui/icons-material/People";
import InterferenceIcon from "@mui/icons-material/Warning"; // Importa un icono para interferencias
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, handlerLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  
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



          {(login.isAuth) && (
            <>
              <Button color="inherit" component={Link} to="/interferences">
                Interferencias
              </Button> {/* Nuevo botón para la página de interferencias */}   
              
            </>
          )}        

          

          {(login.isAdmin || login.isSuperUser) && (
            <>
              <Button color="inherit" component={Link} to="/users">
                Usuarios
              </Button>
              
            </>
          )}

<         Button color="inherit" component={Link} to="/about">
            Acerca de
          </Button>
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

              {login.isAuth && (
                <>
              <ListItem button component={Link} to="/interferences" onClick={closeMenu}>
                <ListItemIcon>
                  <InterferenceIcon sx={{ color: theme.palette.primary.main }} /> {/* Icono para interferencias */}
                </ListItemIcon>
                <ListItemText primary="Interferencias" sx={{ color: theme.palette.text.primary }} />
              </ListItem>
              </>
              )}
              {login.isAdmin && ( 
                <>
                  
                  <ListItem button component={Link} to="/users" onClick={closeMenu}>
                    <ListItemIcon>
                      <PeopleIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" sx={{ color: theme.palette.text.primary }} />
                  </ListItem>                  
                </>
              )}
            </List>
            <ListItem button component={Link} to="/about" onClick={closeMenu}>
              <ListItemIcon>
                <CloudUploadIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Acerca de" sx={{ color: theme.palette.text.primary }} />
            </ListItem>
            
          </Drawer>
        </Hidden>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          

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
