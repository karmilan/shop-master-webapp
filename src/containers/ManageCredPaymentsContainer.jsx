// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import GetYearMonthDate from "../components/common/GetYearMonthDate/GetYearMonthDate";
import AddCredPaymentAccordion from "../components/managecredpayments/AddCredPaymentAccordion";
import credPaymentService from "../services/CredPaymentService ";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import SearchBar from "../templates/SearchBar/SearchBar";

const ManageCredPaymentsContainer = () => {
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
      row.credPaymentId.toLowerCase().includes(filterText.toLowerCase()) ||
      row.dealer.toLowerCase().includes(filterText.toLowerCase()) ||
      row.amount.toString().includes(filterText) ||
      row.dueDate.toLowerCase().includes(filterText.toLowerCase()) ||
      row.paymentDate.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for employee data grid-----------------------------
  const columns = [
    { field: "credPaymentId", headerName: "ID", width: 180, editable: false },
    { field: "dealer", headerName: "Dealer", width: 180, editable: true },
    { field: "amount", headerName: "Amount", width: 100, editable: true },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 180,
      editable: true,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 120,
      editable: true,
    },
    { field: "isPaid", headerName: "Paid", width: 100, editable: true },
    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  // --------------------------------------get all credit payments function---------------------------------
  const fetchCredPayments = async () => {
    try {
      // const data = await credPaymentService.getAllCredPayments();
      const data = await credPaymentService.getCredPaymentsByShop();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        credPaymentId: item.id,
        paymentDate: GetYearMonthDate(item.paymentDate),
        dueDate: GetYearMonthDate(item.dueDate),
        dealer: item?.dealer?.name,
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to fetch cred payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredPayments();
  }, []);

  // ------------------------------------update credit payment details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await credPaymentService.updateCredPayment(newRow.id, newRow);
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

  // ----------------------------------------delete credit payment----------------------------------------------------
  const handleDeleteClick = (id) => async () => {
    try {
      await credPaymentService.deleteCredPayment(id);
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
        <AddCredPaymentAccordion
          setRows={setRows}
          fetchCredPayments={fetchCredPayments}
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

export default ManageCredPaymentsContainer;
