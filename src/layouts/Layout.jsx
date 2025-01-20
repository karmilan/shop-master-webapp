import { Box, Toolbar } from "@mui/material";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DashboardPage from "../pages/DashboardPage";
import ManageAllPaymentsPage from "../pages/ManageAllPaymentsPage";
import ManageCashPaymentsPage from "../pages/ManageCashPaymentsPage";
import ManageCheqPaymentsPage from "../pages/ManageCheqPaymentsPage";
import ManageCredPaymentsPage from "../pages/ManageCredPaymentsPage";
import ManageCustomersPage from "../pages/ManageCustomersPage";
import ManageDealersPage from "../pages/ManageDealersPage";
import ManageEmployeesPage from "../pages/ManageEmployeesPage";
import ManageExpensesPage from "../pages/ManageExpensesPage";
import ManageLoanSettlementPage from "../pages/ManageLoanSettlementPage";
import ManageLoansPage from "../pages/ManageLoansPage";
import ManageProfitsPage from "../pages/ManageProfitsPage";
import ManageShopsPage from "../pages/ManageShopsPage";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

// const drawerWidth = 240;
const drawerWidth = 250;

const Layout = () => {
  const { user, currentShopName, currentShopId } = useContext(AuthContext);

  const currentShopId1 = currentShopId || localStorage.getItem("currentShopId");
  const currentShopName1 =
    currentShopName || localStorage.getItem("currentShopName");

  console.log(
    `${currentShopName1} is on id ${currentShopId1.replace(/"/g, "")}`
  );

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
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
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
            <Route path="/cashpayments" element={<ManageCashPaymentsPage />} />
          </Routes>
          <Routes>
            <Route path="/cheqpayments" element={<ManageCheqPaymentsPage />} />
          </Routes>
          <Routes>
            <Route path="/credpayments" element={<ManageCredPaymentsPage />} />
          </Routes>
          <Routes>
            <Route path="/dealers" element={<ManageDealersPage />} />
          </Routes>
          <Routes>
            <Route path="/customers" element={<ManageCustomersPage />} />
          </Routes>
          <Routes>
            <Route path="/loans" element={<ManageLoansPage />} />
          </Routes>
          <Routes>
            <Route
              path="/loansettlements"
              element={<ManageLoanSettlementPage />}
            />
          </Routes>
          <Routes>
            <Route path="/allpayments" element={<ManageAllPaymentsPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
