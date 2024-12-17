// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import GetYearMonth from "../components/common/GetYearMonth/GetYearMonth";
import AddExpenseAccordion from "../components/manageexpenses/AddExpenseAccordion";
import expenseService from "../services/ExpenseService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import { StyledTextField } from "../templates/TextField/StyledTextField";

const ManageExpensesContainer = () => {
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
      row.shop.toLowerCase().includes(filterText.toLowerCase()) ||
      row.category.toLowerCase().includes(filterText.toLowerCase()) ||
      row.amount.toString().includes(filterText) ||
      row.description.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for shop data grid-----------------------------
  const columns = [
    { field: "shop", headerName: "Shop", width: 180, editable: true },
    { field: "category", headerName: "Category", width: 220, editable: true },
    { field: "amount", headerName: "Amount", width: 220, editable: true },
    { field: "date", headerName: "Date", width: 120, editable: true },
    {
      field: "description",
      headerName: "description",
      width: 180,
      editable: true,
    },

    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  // --------------------------------------get all profits function---------------------------------

  const fetchExpenses = async () => {
    try {
      // const data = await expenseService.getAllExpenses();
      const data = await expenseService.getExpensesByShop();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        shop: item.shop ? item.shop.name : "null",
        date: GetYearMonth(item.date),
      }));
      console.log(mappedData);
      setRows(mappedData);
    } catch (err) {
      setError("Failed to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ------------------------------------update profit details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await expenseService.updateExpense(newRow.id, newRow);
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

  // ----------------------------------------delete profit----------------------------------------------------
  const handleDeleteClick = (id) => async () => {
    try {
      await expenseService.deleteExpense(id);
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
        <AddExpenseAccordion setRows={setRows} fetchExpenses={fetchExpenses} />
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
          setRows={setRows}
          filteredRows={filteredRows}
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

export default ManageExpensesContainer;
