import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useState } from "react";
import shopService from "../../services/ShopService";
import { StyledDataGrid } from "../../templates/DataGrid/StyledDataGrid";

import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import Theme from "../../styles/Theme.json";
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = String(Math.random());
    setRows((oldRows) => [
      ...oldRows,
      { _id: id, name: "", location: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const ShopsDataGrid = ({
  rows,
  setRows,
  loading,
  setLoading,
  columns,
  // processRowUpdate,
}) => {
  const [rowModesModel, setRowModesModel] = useState({});
  const [error, setError] = useState(null);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // const handleSaveClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  //   console.log("rowModesModel>>", rowModesModel);
  // };

  const handleSaveClick = (id) => () => {
    setRowModesModel((prevRowModesModel) => {
      const updatedRowModesModel = {
        ...prevRowModesModel,
        [id]: { mode: GridRowModes.View },
      };
      console.log("rowModesModel>>", updatedRowModesModel);
      return updatedRowModesModel;
    });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await shopService.deleteShop(id);
      setRows(rows.filter((row) => row._id !== id));
    } catch (err) {
      setError("Failed to delete shop");
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  // const processRowUpdate = (newRow) => async () => {
  //   const updatedRow = { ...newRow, isNew: false };
  //   console.log("updatedRow>>", updatedRow);
  //   setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
  //   return updatedRow;
  // };

  const processRowUpdate = async (newRow) => {
    try {
      console.log("newRow>>>", newRow);
      // const response = await axios.put(`/api/rows/${newRow.id}`, newRow);
      const response = await shopService.updateShop(newRow._id, newRow);

      const updatedRow = response.data;
      setRows(rows.map((row) => (row.id === newRow._id ? updatedRow : row)));
      return updatedRow;
    } catch (error) {
      console.error("Failed to update row:", error);
      throw error; // This will revert the row back to its original state if the API call fails
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
            sx={{ color: "primary.main" }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick(id)}
            sx={{ color: "primary.main" }}
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          // className="textPrimary"
          onClick={handleEditClick(id)}
          // color={Theme.palette.myTheme.common.white}
          sx={{ color: Theme.palette.myTheme.common.white }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StyledDataGrid
        rows={rows}
        columns={[...columns, actionColumns]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRows, setRowModesModel } }}
        getRowId={(row) => row._id}
      />
    </Box>
  );
};

export default ShopsDataGrid;

// ================================================================================================

// import React from "react";
// import shopService from "../../services/ShopService";
// import GetDataGrid from "../common/GetDataGrid/GetDataGrid";

// const columns = [
//   { field: "name", headerName: "Name", width: 180, editable: true },
//   { field: "location", headerName: "Address", width: 220, editable: true },
// ];

// const createNewShop = () => {
//   return { _id: String(Math.random()), name: "", location: "", isNew: true };
// };

// const ShopsDataGrid = () => {
//   return (
//     <GetDataGrid
//       apiService={shopService.getAllShops()}
//       columns={columns}
//       createNewRow={createNewShop}
//     />
//   );
// };

// export default ShopsDataGrid;
