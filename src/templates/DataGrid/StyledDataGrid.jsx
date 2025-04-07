import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Colors from "../../constants/colors";

export const StyledDataGrid = styled(DataGrid)({
  border: "3px solid #ddd",
  // "--DataGrid-containerBackground": `${Theme.palette.myTheme.secondary.content}`,
  "--DataGrid-containerBackground": "#E3E8EB",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#0000",
    color: Colors.text500,
    fontWeight: "bold",
    fontSize: "1rem",
  },

  "& .MuiSvgIcon-root": {
    color: Colors.text500,
  },

  "& .MuiDataGrid-cell": {
    color: Colors.text500,
    border: "1px solid #e0e0e0",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#ffffff",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#f9f9f9",
    color: "#333333", // Customize footer background color
  },
  "& .MuiTablePagination-root": {
    color: "#333333",
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    color: "#333333",
  },
  "& .MuiSelect-icon": {
    color: "#333333",
  },
  "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
    backgroundColor: "#008387",
  },
});
