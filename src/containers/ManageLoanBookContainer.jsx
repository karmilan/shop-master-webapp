// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import GetYearMonthDate from "../components/common/GetYearMonthDate/GetYearMonthDate";
import AddLoanBookAccordion from "../components/manageLoanBooks/AddLoanBookAccordion";
import loanBookService from "../services/LoanBookService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import SearchBar from "../templates/SearchBar/SearchBar";

const ManageLoanBookContainer = () => {
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
      row.lbId.toLowerCase().includes(filterText.toLowerCase()) ||
      row.customer.toLowerCase().includes(filterText.toLowerCase()) ||
      row.customerName.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for loan data grid-----------------------------
  const columns = [
    { field: "lbId", headerName: "ID", width: 150, editable: false },
    { field: "customer", headerName: "Customer", width: 120, editable: false },
    {
      field: "customerName",
      headerName: "Name",
      width: 100,
      editable: false,
    },
    {
      field: "creditLimit",
      headerName: "Credit Limit",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "outstandingBalance",
      headerName: "Outstanding Balance",
      width: 100,
      type: "number",
      editable: true,
    },

    {
      field: "totalLoanAmount",
      headerName: "Total Loan Amount",
      width: 100,
      type: "number",
    },
    {
      field: "totalSettledAmount",
      headerName: "Total Settled Amount",
      width: 100,
      type: "number",
    },

    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 80,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: ["active", "inactive", "settled"],
    // },

    {
      field: "isApproved",
      headerName: "Approved",
      width: 120,
      type: "boolean",
      editable: true,
    },

    {
      field: "isClosed",
      headerName: "Closed",
      width: 100,
      type: "boolean",
      editable: true,
    },

    {
      field: "createdAt",
      headerName: "Create Data",
      width: 100,
    },
  ];

  // --------------------------------------get all Loan books function---------------------------------
  const fetchLoanBooks = async () => {
    try {
      console.log("kkld");

      // const data = await loanBookService.getAllLoanBooks();
      const data = await loanBookService.getLoanBooksByShop();
      // console.log("data", data);
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        customer: item?.customer?.customerId,
        customerName: item?.customer?.name,
        outstandingBalance: item?.totalLoanAmount - item?.totalSettledAmount,
        createdAt: GetYearMonthDate(item.createdAt),
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanBooks();
  }, []);

  // ------------------------------------update loan details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    const {
      id,
      creditLimit,
      isApproved,
      isClosed,
      outstandingBalance,
      status,
    } = newRow;

    const updatePayload = {
      creditLimit,
      isApproved,
      isClosed,
      outstandingBalance,
      status,
    };
    try {
      // await loanBookService.updateLoanBooks(newRow.id, newRow);
      await loanBookService.updateLoanBooks(id, updatePayload);
      setRows((prevRows) =>
        // prevRows.map((row) => (row.id === newRow.id ? newRow : row))
        prevRows.map((row) =>
          row.id === id ? { ...row, ...updatePayload } : row
        )
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
      await loanBookService.deleteLoanBooks(id);
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
        <AddLoanBookAccordion lbRows={rows} fetchLoanBooks={fetchLoanBooks} />
        <br />

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

export default ManageLoanBookContainer;
