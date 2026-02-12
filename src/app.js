const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

//Global Middlewares 

app.use(cors());
app.use(express.json());
app.use(apiLimiter);

//API Documentation 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Application Routes 

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

//Health Check Route 

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Task Management Backend is running successfully'
  });
});

//Global Error Handler 

app.use(errorHandler);

module.exports = app;
