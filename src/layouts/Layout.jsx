import { Box, Toolbar } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import AppRoutes from "../routes/AppRoutes";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

// const drawerWidth = 240;
const drawerWidth = 250;

const Layout = () => {
  const { user, currentShopName, currentShopId } = useContext(AuthContext);

  const currentShopId1 = currentShopId || localStorage.getItem("currentShopId");
  const currentShopName1 =
    currentShopName || localStorage.getItem("currentShopName");

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar handleDrawerToggle={handleDrawerToggle} />
        <SideBar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, md: 3 },
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <AppRoutes />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
