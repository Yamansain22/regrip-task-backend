# Task Management API

This project is a backend Task Management API developed for the Regrip assignment. It implements OTP-based authentication, JWT authorization, and secure task management operations using a structured and modular architecture.

The application is built using Node.js, Express.js, and MySQL, and is deployed on Render.

---

## Project Overview

The system allows users to authenticate using email OTP and manage their personal tasks securely. All task routes are protected using JWT-based authentication.

Key capabilities:

* Email-based OTP authentication
* JWT access and refresh token generation
* Secure CRUD operations for tasks
* Rate limiting to prevent abuse
* Structured API documentation using Swagger
* Environment-based configuration

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JSON Web Token (JWT)
* Nodemailer
* Express Rate Limit
* Swagger (OpenAPI 3.0)
* Render (Deployment)

---

## Live Deployment

Base URL:
[https://regrip-task-backend.onrender.com](https://regrip-task-backend.onrender.com)

Swagger Documentation:
[https://regrip-task-backend.onrender.com/api-docs](https://regrip-task-backend.onrender.com/api-docs)

---

## API Endpoints

### Authentication Routes

**POST /api/auth/send-otp**
Sends an OTP to the provided email address.

Request Body:
{
"email": "[user@example.com](mailto:user@example.com)"
}

---

**POST /api/auth/verify-otp**
Verifies OTP and returns access and refresh tokens.

Request Body:
{
"email": "[user@example.com](mailto:user@example.com)",
"otp": "123456"
}

---

### Task Routes (Protected)

All task routes require the following header:

Authorization: Bearer <access_token>

---

**POST /api/tasks**
Creates a new task.

Request Body:
{
"title": "Task title",
"description": "Task description"
}

---

**GET /api/tasks**
Returns all tasks for the authenticated user.

---

**PUT /api/tasks/:id**
Updates an existing task.

Request Body:
{
"title": "Updated title",
"description": "Updated description",
"status": "completed"
}

---

**DELETE /api/tasks/:id**
Deletes a task by ID.

---

## Folder Structure

```
regrip-task-backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   └── validations/
│
├── screenshots/
├── .env.example
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Screenshots

### Swagger Documentation

![Swagger Screenshot](screenshots/swagger.jpg)

---

## Environment Variables

Create a `.env` file using the following structure:

```
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
JWT_REFRESH_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

---

## Production Note

On the Render free plan, outbound SMTP connections may fail due to platform restrictions. OTP functionality works correctly in the local development environment. The complete authentication logic and JWT system are fully implemented and tested.

---

## Running the Project Locally

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Configure environment variables in `.env`
4. Start the server

```
npm run dev
```

Server runs at:
[http://localhost:5000](http://localhost:5000)

---

## Summary

This project demonstrates backend development concepts including authentication, authorization, database integration, API security, rate limiting, and structured documentation. The codebase follows a modular architecture and environment-based configuration suitable for production-ready applications.
