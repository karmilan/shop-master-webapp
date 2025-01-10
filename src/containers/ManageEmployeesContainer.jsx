// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import AddEmployeeAccordion from "../components/manageemployees/AddEmployeeAccordion";
import employeeService from "../services/EmployeeService";
import { StyledPaper } from "../templates/Paper/StyledPaper";
import SearchBar from "../templates/SearchBar/SearchBar";

const ManageEmployeesContainer = () => {
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
      row.role.toLowerCase().includes(filterText.toLowerCase()) ||
      row.address.toLowerCase().includes(filterText.toLowerCase()) ||
      row.phone.toString().includes(filterText) ||
      row.shop.toLowerCase().includes(filterText.toLowerCase())
  );

  // -------------------------------------columns for employee data grid-----------------------------
  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "role", headerName: "Role", width: 180, editable: true },
    { field: "address", headerName: "Address", width: 220, editable: true },
    { field: "phone", headerName: "Phone", width: 120, editable: true },
    { field: "shop", headerName: "Shop", width: 180, editable: true },

    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  // --------------------------------------get all employees function---------------------------------
  const fetchEmployees = async () => {
    try {
      // const data = await employeeService.getAllEmployees();
      const data = await employeeService.getEmployeesByShop();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        shop: item?.shop?.name,
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ------------------------------------update shop details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await employeeService.updateEmployee(newRow.id, newRow);
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

  // ----------------------------------------delete shop----------------------------------------------------
  const handleDeleteClick = (id) => async () => {
    try {
      await employeeService.deleteEmployee(id);
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
        <AddEmployeeAccordion
          setRows={setRows}
          fetchEmployees={fetchEmployees}
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

export default ManageEmployeesContainer;
