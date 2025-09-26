# User Management API

## Project Overview
This project is a **RESTful API** for user management, developed using **Node.js**, **Express**, and **MongoDB**. It provides endpoints for user CRUD operations (Create, Read, Update, Delete) and integrates **bcrypt** for password hashing. All sensitive routes are protected via authentication tokens (JWT).  

---

## Features
- **Create User** (`POST /api/users/register`)  
- **Login User** (`POST /api/users/login`)  
- **Get All Users** (`GET /api/users`) - Protected  
- **Get Single User** (`GET /api/users/:id`) - Protected  
- **Update User** (`PUT /api/users/:id`) - Protected  
- **Delete User** (`DELETE /api/users/:id`) - Protected  
- Passwords are securely hashed using **bcrypt**.  
- Error handling implemented for invalid requests and missing resources.  

---

## Project Structure

```
User Management API/
│
├── config/
│   └── db.js               # MongoDB connection
│
├── controllers/
│   ├── userController.js   # Handles user logic
│   └── taskController.js   # Handles tasks logic
│
├── models/
│   ├── userModel.js        # User schema
│   └── taskModel.js        # Task schema
│
├── routes/
│   ├── users.js            # User routes
│   └── tasks.js            # Task routes
│
├── .env.example            # Template for environment variables
├── .gitignore              # Ignore node_modules and env
├── index.js                # Entry point
├── package.json
└── README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd User Management API
```

2. Install dependencies:

```bash
npm install
npm install express mongoose dotenv bcryptjs express-async-handler jsonwebtoken nodemon
```

3. Create a `.env` file in the root directory and add:

```
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

---

## Running the Project

Start MongoDB:

```bash
mongod
```

Start the server in development mode:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

Server will run on `http://localhost:3000`.

---

## API Endpoints

### 1. Register User
**POST** `/api/users/register`

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 2. Login User
**POST** `/api/users/login`

Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response contains **JWT token** to access protected routes.

---

### 3. Get All Users (Protected)
**GET** `/api/users`  
Header: `Authorization: Bearer <token>`

---

### 4. Get Single User (Protected)
**GET** `/api/users/:id`  
Header: `Authorization: Bearer <token>`

---

### 5. Update User (Protected)
**PUT** `/api/users/:id`  
Header: `Authorization: Bearer <token>`

Body (JSON):
```json
{
  "name": "New Name",
  "password": "newpassword123"
}
```

---

### 6. Delete User (Protected)
**DELETE** `/api/users/:id`  
Header: `Authorization: Bearer <token>`

---

## Technologies Used
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  
- **bcryptjs**  
- **JWT (jsonwebtoken)**  
- **dotenv**  
- **nodemon**

---

## Author
**Ritika Dhanda**  
GitHub: [https://github.com/ritika-dhanda](https://github.com/ritika-dhanda)

---

## Notes
- Ensure MongoDB is running and `.env` variables are correctly set.  
- Use **Postman** to test all endpoints.  
- Passwords are never returned in API responses for security.
