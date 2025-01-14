import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createMovie = (movieData) => API.post("/movies/add", movieData);
export const updateMovie = (id, movieData) => API.put(`/movies/update/${id}`, movieData);
export const deleteMovie = (id) => API.delete(`/movies/delete/${id}`);
