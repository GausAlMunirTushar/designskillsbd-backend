const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register a new user
const registerUser = async (req, res) => {
	const { name, email, password, role } = req.body;

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = new User({ name, email, password, role });
		await user.save();

		const token = generateToken(user._id);

		res.status(201).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: "Server Error", error });
	}
};

// Login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			const token = generateToken(user._id);
			res.status(200).json({ user, token });
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server Error", error });
	}
};

// Forgot password
const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// In a real-world application, you would generate a password reset token and send it to the user's email.
		const resetToken = generateToken(user._id);

		res.status(200).json({
			message: "Password reset token sent to email",
			resetToken,
		});
	} catch (error) {
		res.status(500).json({ message: "Server Error", error });
	}
};

// Get user profile
const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error });
	}
};

module.exports = { registerUser, loginUser, forgotPassword, getUserProfile };
