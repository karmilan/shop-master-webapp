import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Colors from "../../constants/colors";
import Theme from "../../styles/Theme.json";

export const StyledDataGrid = styled(DataGrid)({
  border: "3px solid #ddd",
  // "--DataGrid-containerBackground": `${Theme.palette.myTheme.secondary.content}`,
  "--DataGrid-containerBackground": "#E3E8EB",
  "& .MuiDataGrid-columnHeaders": {
    // backgroundColor: "transparent", // Semi-transparent background for headers
    // color: Theme.palette.myTheme.common.white,
    backgroundColor: "#0000",
    color: Colors.text500,
    fontWeight: "bold",
    fontSize: "1rem",
  },

  "& .MuiSvgIcon-root": {
    // color: Theme.palette.myTheme.common.white,
    color: Colors.text500,
  },

  "& .MuiDataGrid-cell": {
    // color: Theme.palette.myTheme.common.white, // Text color for cells
    color: Colors.text500,
    border: "1px solid #e0e0e0",
  },
  "& .MuiDataGrid-row": {
    // backgroundColor: Theme.palette.myTheme.secondary.content, // Transparent background for rows
    backgroundColor: "#ffffff",
  },
  "& .MuiDataGrid-footerContainer": {
    // backgroundColor: Theme.palette.myTheme.secondary.content,
    // color: Theme.palette.myTheme.common.white, // Customize footer background color
    backgroundColor: "#f9f9f9",
    color: "#333333", // Customize footer background color
  },
  "& .MuiTablePagination-root": {
    // color: Theme.palette.myTheme.common.white, // Customize pagination text color
    color: "#333333",
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    // color: Theme.palette.myTheme.common.white, // Customize specific pagination text elements
    color: "#333333",
  },
  "& .MuiSelect-icon": {
    // color: Theme.palette.myTheme.common.white, // Customize dropdown arrow icon color
    color: "#333333",
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
