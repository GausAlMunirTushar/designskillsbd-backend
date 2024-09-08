const express = require('express');
const dotenv = require('dotenv');
const routes = require('../routes');
const connnectDB = require('../config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connnectDB();
// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/api/v1', routes);

// Export the app
module.exports = app;
