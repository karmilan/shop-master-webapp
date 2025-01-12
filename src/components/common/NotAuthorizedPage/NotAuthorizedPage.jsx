import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Colors from "../../../constants/colors";

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", backgroundColor: Colors.secondary500 }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            403 - Unauthorized
          </Typography>
          <Typography variant="body1" gutterBottom>
            You are not authorized to view this page.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: Colors.secondary500 }}
            onClick={handleBack}
            style={{ marginTop: "20px" }}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default NotAuthorizedPage;
