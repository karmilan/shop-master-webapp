// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import GetYearMonthDate from "../components/common/GetYearMonthDate/GetYearMonthDate";
import AddLoanSettlementAccordion from "../components/manageLoanSettlement/AddLoanSettlementAccordion";
import loanSettlementService from "../services/LoanSettlementService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import SearchBar from "../templates/SearchBar/SearchBar";

const ManageLoanSettlementsContainer = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openUpdateAlert, setOpenUpdateAlert] = useState(false); // State for alert visibility
  const [UpdateAlertSeverity, setUpdateAlertSeverity] = useState();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);

  // --------------------------------------- filter---------------------------------------------
  const [filterText, setFilterText] = useState(""); // State for filter text
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const clearSearchBar = () => {
    setFilterText("");
  };

  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(filterText.toLowerCase()) ||
      row.amount.toString().includes(filterText) ||
      row.customer.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for loan data grid-----------------------------
  const columns = [
    { field: "id", headerName: "ID", width: 180, editable: false },
    { field: "loanBook", headerName: "Loan Book", width: 180, editable: false },
    { field: "customer", headerName: "Customer", width: 180, editable: false },
    { field: "amount", headerName: "Amount", width: 100, editable: true },
    {
      field: "isFullAmountSettled",
      headerName: "Fully Settled",
      width: 100,
      editable: false,
    },

    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  // --------------------------------------get all Loans function---------------------------------
  const fetchLoanSettlements = async () => {
    try {
      const data = await loanSettlementService.getLoanSettlementsByShop();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        customer: item?.loanBook.customer?.name,
        loanBook: item?.loanBook.lbId,
        createdAt: GetYearMonthDate(item.createdAt),
        isFullAmountSettled: item.isFullAmountSettled ? "Yes" : "No",
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanSettlements();
  }, []);

  // ------------------------------------update loan details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      const updatedFields = {
        id: newRow.id,
        // the fields that need updating here
        field1: newRow.amount,
      };

      await loanSettlementService.updateLoanSettlement(
        newRow.id,
        updatedFields
      );
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? newRow : row))
      );
      setOpenUpdateAlert(true);
      setUpdateAlertSeverity("success");
      console.log("success>>>>");
      return newRow;
    } catch (error) {
      console.error("Error updating data:", error);
      console.log("error>>>>");
      setOpenUpdateAlert(true);
      setUpdateAlertSeverity("error");
    }
  };

  // ----------------------------------------delete loan details----------------------------------------------------
  const handleDeleteClick = (id) => async () => {
    try {
      await loanSettlementService.deleteLoanSettlement(id);
      setRows(rows.filter((row) => row.id !== id));
      setDeleteAlertOpen(false);
      setDeleteSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <StyledPaper>
        <AddLoanSettlementAccordion
          setRows={setRows}
          fetchLoanSettlements={fetchLoanSettlements}
        />
        <br />

        {/* <StyledTextField
          label="Search"
          variant="outlined"
          value={filterText}
          onChange={handleFilterChange}
          sx={{ width: "20%", mb: 2 }}
        /> */}

        <Box sx={{ mb: 2 }}>
          <SearchBar
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Search..."
            clear={clearSearchBar}
          />
        </Box>

        <GetDataGrid
          columns={columns}
          rows={rows}
          filteredRows={filteredRows}
          setRows={setRows}
          loading={loading}
          setLoading={setLoading}
          processRowUpdate={processRowUpdate}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
          openUpdateAlert={openUpdateAlert}
          setOpenUpdateAlert={setOpenUpdateAlert}
          UpdateAlertSeverity={UpdateAlertSeverity}
          handleDeleteClick={handleDeleteClick}
          deleteAlertOpen={deleteAlertOpen}
          setDeleteAlertOpen={setDeleteAlertOpen}
          setDeleteSnackbarOpen={setDeleteSnackbarOpen}
          deleteSnackbarOpen={deleteSnackbarOpen}
        />
      </StyledPaper>
    </>
  );
};

export default ManageLoanSettlementsContainer;
