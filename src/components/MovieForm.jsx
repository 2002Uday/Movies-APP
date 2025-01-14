import React, { useState } from "react";
import { createMovie } from "../api";
import { Box, TextField, Button, Typography } from "@mui/material";

const MovieForm = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    bannerImage: "",
    description: "",
    year: "",
    rating: "",
    runTime: "",
  });

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovie(movieData, movieData._id);
      alert("Movie created successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating movie:", error.message);
      alert("Failed to create movie.");
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Add New Movie
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={movieData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Banner Image URL"
          name="bannerImage"
          value={movieData.bannerImage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={movieData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          name="year"
          value={movieData.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          value={movieData.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Run Time"
          name="runTime"
          value={movieData.runTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Create Movie
        </Button>
      </form>
    </Box>
  );
};

export default MovieForm;
