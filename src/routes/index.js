const express = require("express");
const router = express.Router();

const noticeRoutes = require("./notice.routes")

router.use("/notices", noticeRoutes)

module.exports = router
