# Task Management API

This project is a backend Task Management API developed as part of the Regrip assignment. It provides OTP-based authentication, JWT authorization, and task management functionality with proper security and documentation.

The application is built using Node.js, Express, MySQL, and deployed on Render.

---

## Project Overview

The API allows users to:

* Register/Login using email OTP
* Receive JWT access and refresh tokens
* Create, update, delete and view tasks
* Access protected routes securely
* Prevent abuse using rate limiting
* Explore API documentation using Swagger UI

The system follows a clean and modular folder structure.

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT (Authentication)
* Nodemailer (OTP email)
* Express Rate Limit
* Swagger (API documentation)
* Render (Deployment)

---

## Live Deployment

Base URL:
[https://regrip-task-backend.onrender.com](https://regrip-task-backend.onrender.com)

Swagger Documentation:
[https://regrip-task-backend.onrender.com/api-docs](https://regrip-task-backend.onrender.com/api-docs)

---

## API Endpoints

### Authentication

POST /api/auth/send-otp
Send OTP to email

POST /api/auth/verify-otp
Verify OTP and receive JWT tokens

---

### Tasks (Protected Routes)

Authorization Header Required:

Authorization: Bearer <access_token>

POST /api/tasks
Create a new task

GET /api/tasks
Get all tasks of logged-in user

PUT /api/tasks/:id
Update a task

DELETE /api/tasks/:id
Delete a task

---

## Folder Structure

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
├── server.js
└── README.md

---

## Screenshots

### Swagger Documentation

(Add screenshot here)

Example:

![Swagger Screenshot](screenshots/swagger.jpg)

---

## Environment Variables

Create a .env file using the following structure:

PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
JWT_REFRESH_SECRET=
EMAIL_USER=
EMAIL_PASS=

---

## OTP Notice (Production)

Due to restrictions on Render free plan, external SMTP connections (Gmail) may not function properly in production.

However:

* OTP functionality works correctly in local development.
* All authentication logic is fully implemented and tested.
* JWT and task management features work as expected in production.

---

## How to Run Locally

1. Clone the repository
2. Install dependencies using:

npm install

3. Add environment variables in .env file
4. Start the server using:

npm run dev

Server runs at:
[http://localhost:5000](http://localhost:5000)

---

## Conclusion

This project demonstrates backend development skills including authentication, authorization, database integration, API security, rate limiting, and documentation.

The codebase is modular, structured, and production-ready.
