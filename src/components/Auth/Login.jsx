import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
}) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#0d1926" }}>
          Welcome Back!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <TextField
            label="User Name"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ fontWeight: "bold", borderRadius: 2, bgcolor: "#0d1926" }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
