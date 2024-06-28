import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";
import { StyledDataGrid } from "../../../templates/DataGrid/StyledDataGrid";
import UpdateSnackbar from "../Snackbar/UpdateSnackbar";

const GetDataGrid = ({
  columns,
  rows,
  setRows,
  loading,
  setLoading,
  processRowUpdate,
  rowModesModel,
  setRowModesModel,
  openUpdateAlert,
  setOpenUpdateAlert,
  UpdateAlertSeverity,
  handleDeleteClick,
  deleteAlertOpen,
  setDeleteAlertOpen,
  deleteSnackbarOpen,
  setDeleteSnackbarOpen,
}) => {
  const [alertSeverity, setAlertSeverity] = useState(); // State for alert severity

  // --------------------------------------- delete dialog--------------------------------------
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleClickOpen = (id) => () => {
    console.log("id>>>>", id);
    setRowToDelete(id);
    setDeleteAlertOpen(true);
  };

  const handleClose = () => {
    setDeleteAlertOpen(false);
  };
  // -------------------------------------------------------------------------------------------

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDeleteSnackbarAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDeleteSnackbarOpen(false);
  };

  const actionColumns = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "red !important",
            }}
            color="inherit"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          // onClick={handleDeleteClick(id)}
          onClick={handleClickOpen(id)}
          color="inherit"
        />,
      ];
    },
  };

  return (
    <>
      {/* --------------------------------alert-------------------------------- */}

      <UpdateSnackbar
        openAlert={openUpdateAlert}
        setOpenAlert={setOpenUpdateAlert}
        // alertSeverity={alertSeverity}
        alertSeverity={UpdateAlertSeverity}
      />
      {/* ------------------------------------------------------------------------ */}

      {/* ---------------------------------delete dialog alert component------------ */}
      <Dialog open={deleteAlertOpen} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteClick(rowToDelete)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleDeleteSnackbarAlertClose}
      >
        <Alert variant="filled" severity="error">
          Data deleted successfully!
        </Alert>
      </Snackbar>
      {/* -------------------------------------------------------------------------- */}
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <StyledDataGrid
          rows={rows}
          // columns={columns}
          columns={[...columns, actionColumns]}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </>
  );
};
export default GetDataGrid;
