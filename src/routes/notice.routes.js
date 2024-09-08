const express = require("express");
const { createNotice, getNotice } = require("../controllers/notice.controller");

const router = express.Router();

router.post("/create", createNotice);
router.get("/", getNotice);

module.exports = router;
