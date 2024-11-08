// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import AddCashPaymentAccordion from "../components/managecashpayments/AddCashPaymentAccordion";
import cashPaymentService from "../services/CashPaymentService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import { StyledTextField } from "../templates/TextField/StyledTextField";

const ManageCashPaymentsContainer = () => {
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

  const filteredRows = rows.filter(
    (row) =>
      row.dealer.toLowerCase().includes(filterText.toLowerCase()) ||
      row.amount.toString().includes(filterText) ||
      row.paymentDate.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for employee data grid-----------------------------
  const columns = [
    { field: "cashPaymentId", headerName: "ID", width: 180, editable: false },
    { field: "dealer", headerName: "Dealer", width: 180, editable: true },
    { field: "amount", headerName: "Amount", width: 220, editable: true },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 120,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  useEffect(() => {
    // --------------------------------------get all cash payments function---------------------------------
    const fetchShops = async () => {
      try {
        const data = await cashPaymentService.getAllCashPayments();
        const mappedData = data.map((item) => ({
          ...item,
          id: item._id,
          cashPaymentId: item.id,
        }));

        setRows(mappedData);
      } catch (err) {
        setError("Failed to fetch cash payments");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // ------------------------------------update cash payment details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await cashPaymentService.updateCashPayment(newRow.id, newRow);
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

  // ----------------------------------------delete cash payment----------------------------------------------------
  const handleDeleteClick = (id) => async () => {
    try {
      await cashPaymentService.deleteCashPayment(id);
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
        <AddCashPaymentAccordion setRows={setRows} />
        <br />

        <StyledTextField
          label="Search"
          variant="outlined"
          value={filterText}
          onChange={handleFilterChange}
          sx={{ width: "20%", mb: 2 }}
        />

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

export default ManageCashPaymentsContainer;
