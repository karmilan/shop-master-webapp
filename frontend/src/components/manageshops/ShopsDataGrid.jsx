// import AddIcon from "@mui/icons-material/Add";
// import CancelIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import {
//   GridActionsCellItem,
//   GridRowEditStopReasons,
//   GridRowModes,
//   GridToolbarContainer,
// } from "@mui/x-data-grid";
// import React, { useEffect, useState } from "react";
// import shopService from "../services/ShopService";
// import { StyledDataGrid } from "../templates/DataGrid/StyledDataGrid";

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = String(Math.random());
//     setRows((oldRows) => [
//       ...oldRows,
//       { _id: id, name: "", location: "", isNew: true },
//     ]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// const ShopsDataGrid = () => {
//   const [rows, setRows] = useState([]);
//   const [rowModesModel, setRowModesModel] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const data = await shopService.getAllShops();
//         setRows(data);
//       } catch (err) {
//         setError("Failed to fetch shops");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchShops();
//   }, []);

//   const handleRowEditStop = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => async () => {
//     try {
//       const row = rows.find((row) => row._id === id);
//       await shopService.updateShop(id, row);
//       setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//     } catch (err) {
//       setError("Failed to update shop");
//     }
//   };

//   const handleDeleteClick = (id) => async () => {
//     try {
//       await shopService.deleteShop(id);
//       setRows(rows.filter((row) => row._id !== id));
//     } catch (err) {
//       setError("Failed to delete shop");
//     }
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row._id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row._id !== id));
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
//     return updatedRow;
//   };

//   const handleRowModesModelChange = (newRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const columns = [
//     { field: "name", headerName: "Name", width: 180, editable: true },
//     { field: "location", headerName: "Address", width: 220, editable: true },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: "Actions",
//       width: 100,
//       cellClassName: "actions",
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               sx={{ color: "primary.main" }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               //   color="inherit"
//               sx={{ color: "primary.main" }}
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <Box sx={{ height: 400, width: "100%" }}>
//       <StyledDataGrid
//         rows={rows}
//         columns={columns}
//         editMode="row"
//         rowModesModel={rowModesModel}
//         onRowModesModelChange={handleRowModesModelChange}
//         onRowEditStop={handleRowEditStop}
//         processRowUpdate={processRowUpdate}
//         slots={{ toolbar: EditToolbar }}
//         slotProps={{ toolbar: { setRows, setRowModesModel } }}
//         getRowId={(row) => row._id}
//       />
//     </Box>
//   );
// };

// export default ShopsDataGrid;

import React from "react";
import shopService from "../../services/ShopService";
import GetDataGrid from "../common/GetDataGrid/GetDataGrid";

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "location", headerName: "Address", width: 220, editable: true },
];

const createNewShop = () => {
  return { _id: String(Math.random()), name: "", location: "", isNew: true };
};

const ShopsDataGrid = () => {
  return (
    <GetDataGrid
      apiService={shopService.getAllShops()}
      columns={columns}
      createNewRow={createNewShop}
    />
  );
};

export default ShopsDataGrid;
