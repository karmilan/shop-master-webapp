import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageCashPaymentsPage from "../pages/ManageCashPaymentsPage";
import ManageCheqPaymentsPage from "../pages/ManageCheqPaymentsPage";
import ManageCredPaymentsPage from "../pages/ManageCredPaymentsPage";
import ManageCustomersPage from "../pages/ManageCustomersPage";
import ManageEmployeesPage from "../pages/ManageEmployeesPage";
import ManageExpensesPage from "../pages/ManageExpensesPage";
import ManageProfitsPage from "../pages/ManageProfitsPage";
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
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/shops" element={<ManageShopsPage />} />
          </Routes>
          <Routes>
            <Route path="/employees" element={<ManageEmployeesPage />} />
          </Routes>
          <Routes>
            <Route path="/profits" element={<ManageProfitsPage />} />
          </Routes>
          <Routes>
            <Route path="/expenses" element={<ManageExpensesPage />} />
          </Routes>
          <Routes>
            <Route path="/customers" element={<ManageCustomersPage />} />
          </Routes>
          <Routes>
            <Route path="/cashpayments" element={<ManageCashPaymentsPage />} />
          </Routes>
          <Routes>
            <Route path="/cheqpayments" element={<ManageCheqPaymentsPage />} />
          </Routes>
          <Routes>
            <Route path="/credpayments" element={<ManageCredPaymentsPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
