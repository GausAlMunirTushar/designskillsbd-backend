const Notice = require("../models/Notice");

// Create a new notice
const createNotice = async (req, res) => {
	try {
		const { title, content } = req.body;
		const newNotice = new Notice({
			title,
			content,
		});
		await newNotice.save();
		res.status(201).json({
			message: "Notice created successfully!",
			notice: newNotice,
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to create notice" });
	}
};

// Get all notices
const getNotices = async (req, res) => {
	try {
		const notices = await Notice.find().sort({ createdAt: -1 });
		res.status(200).json(notices);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch notices" });
	}
};

// Get a single notice by ID
const getNoticeById = async (req, res) => {
	try {
		const notice = await Notice.findById(req.params.id);
		if (!notice) {
			return res.status(404).json({ error: "Notice not found" });
		}
		res.status(200).json(notice);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch notice" });
	}
};

module.exports = {
	createNotice,
	getNotices,
	getNoticeById,
};
