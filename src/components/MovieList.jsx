import React, { useEffect, useState } from "react";
import { fetchMovies, updateMovie, deleteMovie } from "../api";
import { isAdmin } from "../auth";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [movieData, setMovieData] = useState({
    title: "",
    bannerImage: "",
    description: "",
    year: "",
    rating: "",
    runTime: "",
    _id: "",
  });

  const handleOpen = (movie) => {
    setMovieData(movie); // Set the selected movie data
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this movie?")) {
        await deleteMovie(id); // Ensure deleteMovie API call is correct
        alert("Movie deleted successfully!");
        // Optionally refresh or fetch updated movie list
        // fetchMovies(); // Uncomment if using a fetch function to reload movies
      }
    } catch (error) {
      console.error("Error deleting movie:", error.message);
      alert("Failed to delete movie.");
    }
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Correct the parameter order for updateMovie
      await updateMovie(movieData._id, movieData);
      alert("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error.message);
      alert("Failed to update movie.");
    }
    console.log("Updated Movie Data:", movieData);
    window.location.reload();
    handleClose(); // Close the dialog after submission
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies();
        setMovies(response.data.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setLoading(false);
      }
    };
    const checkAdmin = async () => {
      const admin = await isAdmin();
      setIsAdminUser(admin);
    };
    loadMovies();
    checkAdmin();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box padding={4}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          borderLeftWidth: 5,
          borderLeftColor: "#FFBC42",
          pl: 2,
          fontWeight: "bold",
        }}
      >
        All Movies
      </Typography>
      {movies.map((movie) => (
        <Card
          key={movie._id}
          sx={{
            marginBottom: 2,
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography variant="h5">{movie.title}</Typography>
            <Typography>{movie.description}</Typography>
            <Typography>Year: {movie.year}</Typography>
            <Typography>Rating: {movie.rating}</Typography>
            <Typography>Run Time: {movie.runTime} mins</Typography>
          </CardContent>
          {isAdminUser && (
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                gap: 2,
              }}
            >
              <Button
                onClick={() => handleOpen(movie)}
                sx={{ borderRadius: 2 }}
              >
                Edit
              </Button>
              <Button
                sx={{ backgroundColor: "red", color: "white", borderRadius: 2 }}
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </Button>
            </CardContent>
          )}
        </Card>
      ))}

      {/* Popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={movieData.title}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="bannerImage"
              label="Banner Image URL"
              type="text"
              fullWidth
              value={movieData.bannerImage}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={movieData.description}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="year"
              label="Year"
              type="number"
              fullWidth
              value={movieData.year}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="rating"
              label="Rating"
              type="number"
              fullWidth
              value={movieData.rating}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="runTime"
              label="Run Time (mins)"
              type="number"
              fullWidth
              value={movieData.runTime}
              onChange={handleChange}
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieList;
