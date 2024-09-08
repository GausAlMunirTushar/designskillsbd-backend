const express = require("express");
const {
	getNoticeById,
	getNotices,
	createNotice,
} = require("../controllers/notice.controller");
const router = express.Router();

// Route to create a new notice
router.post("/", createNotice);

// Route to get all notices
router.get("/", getNotices);

// Route to get a single notice by ID
router.get("/:id", getNoticeById);

module.exports = router;
