import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ManageAllPaymentsPage from "../pages/ManageAllPaymentsPage";
import ManageCashPaymentsPage from "../pages/ManageCashPaymentsPage";
import ManageCheqPaymentsPage from "../pages/ManageCheqPaymentsPage";
import ManageCredPaymentsPage from "../pages/ManageCredPaymentsPage";
import ManageCustomersPage from "../pages/ManageCustomersPage";
import ManageDealersPage from "../pages/ManageDealersPage";
import ManageEmployeesPage from "../pages/ManageEmployeesPage";
import ManageExpensesPage from "../pages/ManageExpensesPage";
import ManageLoanBookPage from "../pages/ManageLoanBookPage";
import ManageLoanSettlementPage from "../pages/ManageLoanSettlementPage";
import ManageLoansPage from "../pages/ManageLoansPage";
import ManageProfitsPage from "../pages/ManageProfitsPage";
import ManageShopsPage from "../pages/ManageShopsPage";

const AppRoutes = () => {
  return (
    <>
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
        <Route path="/loansettlements" element={<ManageLoanSettlementPage />} />
      </Routes>
      <Routes>
        <Route path="/allpayments" element={<ManageAllPaymentsPage />} />
      </Routes>
      <Routes>
        <Route path="/loanbooks" element={<ManageLoanBookPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
