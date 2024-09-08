const Notice = require("../models/notice.model");

// Create or replace the existing notice
const createNotice = async (req, res) => {
	try {
		const { title, content } = req.body;

		// Remove the existing notice if it exists
		await Notice.deleteMany();

		// Create a new notice
		const newNotice = new Notice({
			title,
			content,
		});

		await newNotice.save();
		res.status(201).json({
			message: "Notice created successfully, previous notice removed!",
			notice: newNotice,
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to create notice" });
	}
};

// Get the current (single) notice
const getNotice = async (req, res) => {
	try {
		const notice = await Notice.findOne().sort({ createdAt: -1 }); // Fetch the latest notice
		if (!notice) {
			return res.status(404).json({ error: "No notice found" });
		}
		res.status(200).json(notice);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch notice" });
	}
};

module.exports = {
	createNotice,
	getNotice,
};
