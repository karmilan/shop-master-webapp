import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { _NavBar } from "../styles/NavBarStyles";
import AccountMenu from "./AccountMenu";

const NavBar = ({ handleDrawerToggle }) => {
  const { currentShopName } = useContext(AuthContext);
  const currentShopName1 =
    currentShopName || localStorage.getItem("currentShopName");

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
      <AppBar position="fixed" sx={_NavBar.appBar}>
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
            SHOP MASTER -{" "}
            <span style={{ fontSize: "15px" }}>{import.meta.env.VITE_ENV}</span>{" "}
            -<span style={{ fontSize: "15px" }}>{currentShopName1}</span>
          </Typography>

          {/* --------------------------profile and settings---------------------------- */}

          <AccountMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
