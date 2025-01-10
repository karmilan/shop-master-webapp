// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import AddDealerAccordion from "../components/manageDealers/AddDealerAccordion";
import AuthContext from "../context/AuthContext";
import dealerService from "../services/DealerService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import SearchBar from "../templates/SearchBar/SearchBar";

const ManageDealersContainer = () => {
  const { user, token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

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
      row.name.toLowerCase().includes(filterText.toLowerCase()) ||
      row.contactNumber.toLowerCase().includes(filterText.toLowerCase()) ||
      row.email.toLowerCase().includes(filterText.toLowerCase()) ||
      row.address.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for customer data grid-----------------------------
  const columns = [
    {
      field: "dealerId",
      headerName: "ID",
      width: 180,
      editable: false,
      renderCell: (params) => (
        <Link
          to="/allpayments"
          state={{ _dealerId: params.row._id }}
          style={{
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {params.value}
        </Link>
      ),
    },

    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "contactNumber", headerName: "Phone", width: 120, editable: true },
    { field: "email", headerName: "Email", width: 180, editable: true },
    { field: "address", headerName: "Address", width: 220, editable: true },
    {
      field: "creditLimit",
      headerName: "Credit Limit",
      width: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  // --------------------------------------get all dealers function---------------------------------
  const fetchDealers = async () => {
    try {
      // const data = await dealerService.getAllDealers(currentToken);
      const data = await dealerService.getDealerByShop();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  // ------------------------------------update shop details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await dealerService.updateDealer(newRow.id, newRow);
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

  // ----------------------------------------delete Dealer----------------------------------------------------
  const handleDeleteClick = (id) => async () => {
    try {
      await dealerService.deleteDealer(id);
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
        <AddDealerAccordion setRows={setRows} fetchDealers={fetchDealers} />
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

export default ManageDealersContainer;
