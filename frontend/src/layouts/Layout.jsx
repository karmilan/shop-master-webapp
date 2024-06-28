import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageShopsPage from "../pages/ManageShopsPage";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

// const drawerWidth = 240;
const drawerWidth = 250;

const Layout = () => {
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
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box
          component="main"
          // bgcolor="#0d1926"
          // bgcolor={_Colors.commonBgColor}
          // height="100vh"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {/* <Typography paragraph>Main content goes here.</Typography> */}
          {/* <ManageShopsPage /> */}
          <Routes>
            <Route path="/shops" element={<ManageShopsPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
