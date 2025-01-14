import React, { useEffect, useState, useCallback } from "react";
import { isAdmin } from "../auth";
import debounce from "lodash/debounce";
import axios from "axios";
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
  Select,
  MenuItem,
  Pagination,
  Rating,
  Stack,
} from "@mui/material";
import { deleteMovie, updateMovie } from "../api";

const API_BASE_URL = "http://localhost:5000";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  // Create a debounced function for API calls
  const debouncedSearch = useCallback(
    debounce((query) => {
      setCurrentPage(1); // Reset to first page on new search
      loadMovies(query, sortOption, 1);
    }, 500),
    [sortOption]
  );

  const loadMovies = async (search, sort, page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/list`, {
        params: {
          search,
          sort,
          order,
          page,
          limit: 10,
        },
      });

      const { movies, pagination } = response.data;
      setMovies(movies);
      setTotalPages(pagination.totalPages);
      setTotalMovies(pagination.totalMovies);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin();
      setIsAdminUser(admin);
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    loadMovies(searchQuery, sortOption, currentPage);
  }, [sortOption, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setOrder("desc");
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleOpen = (movie) => {
    setMovieData(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const success = await deleteMovie(id);
      if (success) {
        alert("Movie deleted successfully!");
        window.location.reload();
        // loadMovies(searchQuery, sortOption, currentPage);
      } else {
        alert("Failed to delete movie.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateMovie(movieData._id, movieData);
    if (success) {
      alert("Movie updated successfully!");
      loadMovies(searchQuery, sortOption, currentPage);
      handleClose();
    } else {
      alert("Failed to update movie.");
    }
  };

  if (loading && movies.length === 0) return <CircularProgress />;

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
        All Movies ({totalMovies})
      </Typography>

      <Box display="flex" gap={2} marginBottom={2}>
        <TextField
          label="Search movies..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Select
          value={sortOption}
          onChange={handleSortChange}
          displayEmpty
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="runTime">Duration</MenuItem>
        </Select>
      </Box>

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
          <CardContent sx={{ width: 200 }}>
            <img
              key={movie._id}
              src={movie.bannerImage}
              alt={movie.title}
              style={{ borderRadius: 10, height: 200, width: 350 }}
            />
          </CardContent>
          <CardContent sx={{ width: "80%" }}>
            <Typography variant="h5">{movie.title}</Typography>
            <Typography>{movie.description}</Typography>
            <Typography>Year: {movie.year}</Typography>
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={Math.min(
                  5,
                  Math.max(
                    1,
                    Math.round(
                      ((movie.rating - 5) / (5 - 1)) * 4
                    ) + 1
                  )
                )}
                readOnly
              />
            </Stack>
            <Typography>Run Time: {movie.runTime} mins</Typography>
          </CardContent>
          {isAdminUser && (
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                minWidth: 120,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => handleOpen(movie)}
                sx={{ borderRadius: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(movie._id)}
                sx={{ borderRadius: 2 }}
              >
                Delete
              </Button>
            </CardContent>
          )}
        </Card>
      ))}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" marginTop={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

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
              multiline
              rows={4}
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
