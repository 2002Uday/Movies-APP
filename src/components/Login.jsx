import React, { useState } from "react";
import { setToken } from "../auth";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      setToken(response.data.token);
      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid email or password.");
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
