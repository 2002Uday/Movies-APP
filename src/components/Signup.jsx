import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { setToken } from "../auth";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        userData
      );
      setToken(response.data.token);
      alert("Signup successful! Please log in.");
      window.location.href = "/";
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert("Failed to create account.");
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
