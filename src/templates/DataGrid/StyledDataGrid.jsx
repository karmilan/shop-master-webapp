import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Theme from "../../styles/Theme.json";

export const StyledDataGrid = styled(DataGrid)({
  // "--DataGrid-containerBackground": "#0d1926",
  "--DataGrid-containerBackground": `${Theme.palette.myTheme.secondary.content}`,
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "transparent", // Semi-transparent background for headers
    color: Theme.palette.myTheme.common.white,
  },

  "& .MuiSvgIcon-root": {
    color: Theme.palette.myTheme.common.white,
  },

  "& .MuiDataGrid-cell": {
    color: Theme.palette.myTheme.common.white, // Text color for cells
  },
  "& .MuiDataGrid-row": {
    backgroundColor: Theme.palette.myTheme.secondary.content, // Transparent background for rows
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: Theme.palette.myTheme.secondary.content,
    color: Theme.palette.myTheme.common.white, // Customize footer background color
  },
  "& .MuiTablePagination-root": {
    color: Theme.palette.myTheme.common.white, // Customize pagination text color
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    color: Theme.palette.myTheme.common.white, // Customize specific pagination text elements
  },
  "& .MuiSelect-icon": {
    color: Theme.palette.myTheme.common.white, // Customize dropdown arrow icon color
  },
  "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
    backgroundColor: Theme.palette.myTheme.secondary.content,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
  },
  "& .css-praxrm-MuiDataGrid-root .MuiDataGrid-row--editing .MuiDataGrid-cell":
    {
      backgroundColor: "green",
    },
  "& .editable-cell": {
    backgroundColor: "red",
  },
});
