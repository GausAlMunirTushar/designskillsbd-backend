const express = require("express");
const {
	registerUser,
	loginUser,
	forgotPassword,
	getUserProfile,
} = require("../controllers/auth.controller");
const { Authentication } = require("../middlewares/auth.middleware");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Get user profile
router.get("/profile", Authentication , getUserProfile);

module.exports = router;
