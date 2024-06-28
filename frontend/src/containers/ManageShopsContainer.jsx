// import ShopsDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import { useEffect, useState } from "react";
import GetDataGrid from "../components/common/GetDataGrid/GetDataGrid";
import AddShopAccordion from "../components/manageshops/AddShopAccordion";
import shopService from "../services/ShopService";
import { StyledPaper } from "../templates/Paper/StyledPaper";

const ManageShopsContainer = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openUpdateAlert, setOpenUpdateAlert] = useState(false); // State for alert visibility
  const [UpdateAlertSeverity, setUpdateAlertSeverity] = useState();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);

  // -------------------------------------columns for shop data grid-----------------------------
  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "address", headerName: "Address", width: 220, editable: true },
    { field: "phone", headerName: "Phone", width: 120, editable: true },
    { field: "email", headerName: "Email", width: 180, editable: true },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
    },
    {
      field: "createdAt",
      headerName: "Create Data",
      width: 200,
    },
  ];

  useEffect(() => {
    // --------------------------------------get all shops function---------------------------------
    const fetchShops = async () => {
      try {
        const data = await shopService.getAllShops();
        const mappedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));

        setRows(mappedData);
      } catch (err) {
        setError("Failed to fetch shops");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // ------------------------------------update shop details function --------------------------------------

  const processRowUpdate = async (newRow) => {
    try {
      await shopService.updateShop(newRow.id, newRow);
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
      await shopService.deleteShop(id);
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
        <AddShopAccordion setRows={setRows} />
        <br />
        <GetDataGrid
          columns={columns}
          rows={rows}
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

export default ManageShopsContainer;
