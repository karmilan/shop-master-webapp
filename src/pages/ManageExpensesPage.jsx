import { Box } from "@mui/material";
import ManageExpensesContainer from "../containers/ManageExpensesContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageExpensesPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Expenses"
          subHeader="Create or manage existing Expenses"
        />
        <ManageExpensesContainer />
      </Box>
    </>
  );
};

export default ManageExpensesPage;
