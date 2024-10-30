import { Box } from "@mui/material";
import React from "react";
import ManageEmployeesContainer from "../containers/ManageEmployeesContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageEmployeesPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Employees"
          subHeader="Create or manage existing Employees"
        />
        <ManageEmployeesContainer />
      </Box>
    </>
  );
};

export default ManageEmployeesPage;
