import { Alert, Snackbar } from "@mui/material";

const UpdateSnackbar = ({ openAlert, setOpenAlert, alertSeverity }) => {
  console.log("alertSeverity>>>", alertSeverity);
  return (
    <>
      <Snackbar
        open={openAlert} // Controlled by setOpenAlert state
        autoHideDuration={6000} // Auto-close after 6 seconds
        onClose={() => setOpenAlert(false)} // Close handler for Alert
      >
        <Alert variant="filled" severity={alertSeverity}>
          {" "}
          {/* Set severity based on success/error */}
          {alertSeverity === "success"
            ? "Data updated successfully!"
            : "Error updating data."}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateSnackbar;
