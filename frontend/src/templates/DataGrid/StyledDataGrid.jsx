import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)({
  "--DataGrid-containerBackground": "transparent",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "transparent", // Semi-transparent background for headers
    color: "white",
  },
  "& .MuiDataGrid-cell": {
    color: "white", // Text color for cells
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "transparent", // Transparent background for rows
  },
});
