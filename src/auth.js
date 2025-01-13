import Cookies from "cookies-js";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";

// Set token into cookies
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 * 24 * 60 * 60 }); // Token will expire in 7 days
};

// Get token from cookies
export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

// Remove token from cookies
export const removeToken = () => {
  Cookies.expire(TOKEN_KEY);
};

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === "admin"; // Assuming `role` is a field in the token payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
