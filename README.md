# Movie Management App

This repository contains a full-stack movie management application built using:
- **Frontend**: React.js with Material-UI and Tailwind CSS for responsiveness
- **Backend**: Node.js with Express.js
- **Database**: MongoDB

The application allows users to:
1. View all movies (public access).
2. Add, update, or delete movies (admin access only).
3. Login and Signup with role-based authentication.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm or yarn
- Vite (optional for faster development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-management-app.git
   cd movie-management-app
   ```

3. Install dependencies for the frontend:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `frontend` directory for API endpoints (if necessary):
     ```env
     REACT_APP_API_URL=${API_BASE_URL}
     ```

### Running the Application

1. Start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## API Documentation

### Base URL
```
${API_BASE_URL}
```

### Authentication Endpoints

#### 1. Login
**POST** `/auth/login`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "token": "jwt_token"
  }
  ```

#### 2. Signup
**POST** `/auth/signup`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "role": "admin" // or "user"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

### Movie Endpoints

#### 1. Get All Movies (Public Access)
**GET** `/movies/list`
- Response:
  ```json
  [
    {
      "_id": "movie_id",
      "title": "Movie Title",
      "description": "Description",
      "year": 2023,
      "rating": 4.5,
      "runTime": 120
    }
  ]
  ```

#### 2. Add Movie (Admin Access)
**POST** `/movies/add`
- Request Body:
  ```json
  {
    "title": "Movie Title",
    "description": "Description",
    "year": 2023,
    "rating": 4.5,
    "runTime": 120
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Movie added successfully"
  }
  ```

#### 3. Update Movie (Admin Access)
**PUT** `/movies/update/:id`
- Request Body:
  ```json
  {
    "title": "Updated Movie Title",
    "description": "Updated Description"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Movie updated successfully"
  }
  ```

#### 4. Delete Movie (Admin Access)
**DELETE** `/movies/delete/:id`
- Response:
  ```json
  {
    "success": true,
    "message": "Movie deleted successfully"
  }
  ```
