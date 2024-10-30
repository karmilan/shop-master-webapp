// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import GetYearMonth from "../components/common/GetYearMonth/GetYearMonth";
import AddProfitAccordion from "../components/manageprofits/AddProfitAccordion";
import profitService from "../services/ProfitService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import { StyledTextField } from "../templates/TextField/StyledTextField";

const ManageProfitsContainer = () => {
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
      row.amount.toString().includes(filterText) ||
      row.description.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for shop data grid-----------------------------
  const columns = [
    { field: "shop", headerName: "Shop", width: 180, editable: true },
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

  useEffect(() => {
    // --------------------------------------get all profits function---------------------------------

    const fetchProfits = async () => {
      try {
        const data = await profitService.getAllProfits();
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

    fetchProfits();
  }, []);

  // ------------------------------------update profit details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await profitService.updateProfit(newRow.id, newRow);
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
      await profitService.deleteProfit(id);
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
        <AddProfitAccordion setRows={setRows} />
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

export default ManageProfitsContainer;
