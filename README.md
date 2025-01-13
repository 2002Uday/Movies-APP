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

## Features

### Public Features
- View all movies.
- View movie details by ID.

### Admin Features
- Add a new movie.
- Update movie details.
- Delete a movie.

---

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI) for styling.
- Tailwind CSS for responsiveness.
- `react-router-dom` for routing.
- `cookies-js` for handling authentication tokens.

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose for object modeling).
- JWT for authentication.

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

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and configure the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Create a `.env` file in the `frontend` directory for API endpoints (if necessary):
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### 1. Login
**POST** `/auth/login`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
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
    "name": "John Doe",
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
**GET** `/movies`
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

#### 2. Get Movie by ID (Public Access)
**GET** `/movies/:id`
- Response:
  ```json
  {
    "_id": "movie_id",
    "title": "Movie Title",
    "description": "Description",
    "year": 2023,
    "rating": 4.5,
    "runTime": 120
  }
  ```

#### 3. Add Movie (Admin Access)
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

#### 4. Update Movie (Admin Access)
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

#### 5. Delete Movie (Admin Access)
**DELETE** `/movies/delete/:id`
- Response:
  ```json
  {
    "success": true,
    "message": "Movie deleted successfully"
  }
  ```

---

## Folder Structure

### Backend
```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── server.js
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── App.jsx
├── public/
└── vite.config.js
```

---

## Contributing
Feel free to fork this repository and contribute by submitting pull requests. Make sure to follow best practices and write clean, maintainable code.

---

## License
This project is licensed under the [MIT License](LICENSE).

