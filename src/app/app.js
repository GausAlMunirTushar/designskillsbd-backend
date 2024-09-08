const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
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
app.use(cors())
// Get health
app.get("/health", (req, res) => {
	res.status(200).json({ message: "Server is up and running" });
});

// Use the routes
app.use('/api/v1', routes);

// Export the app
module.exports = app;
