const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: true,
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	enrolledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
