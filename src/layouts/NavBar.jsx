import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { _NavBar } from "../styles/NavBarStyles";
import AccountMenu from "./AccountMenu";

const NavBar = ({ handleDrawerToggle }) => {
  const { user, currentUser, logout } = useContext(AuthContext);

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" elevation="6" sx={_NavBar.appBar}>
        <Toolbar
          sx={{ justifyContent: { xs: "space-evenly", md: "space-between" } }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SHOP MASTER - {import.meta.env.VITE_ENV}
          </Typography>

          {/* --------------------------profile and settings---------------------------- */}

          <AccountMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
