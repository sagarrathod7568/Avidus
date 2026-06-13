# Avidus - Task Management System

A full-stack Task Management application built using React, Node.js, Express.js, and MongoDB Atlas.

## Live Demo

Frontend: https://avidus-eta.vercel.app


## Features

* User Authentication (JWT)
* Role-Based Access Control (Admin/User)
* Task Management (Create, Update, Delete)
* User Management
* Activity Logs
* Analytics Dashboard
* Responsive UI

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs

---

## Clone Repository

```bash
git clone https://github.com/sagarrathod7568/Avidus.git
cd Avidus
```

---

## Project Structure

```text
Avidus/
├── Frontend/
└── Backend/
```

---

## Backend Setup

### Navigate to Backend Folder

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file inside the Backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### Run Backend

```bash
npm start
```

Backend will run on:

```text
http://localhost:5000
```

---

## Frontend Setup

### Open New Terminal and Navigate to Frontend Folder

```bash
cd Frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file inside the Frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

### Admin

* GET `/api/admin/users`
* PUT `/api/admin/users/:id`
* DELETE `/api/admin/users/:id`

### Analytics

* GET `/api/analytics`

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## Author

**Sagar Rathod**
Full Stack Developer
