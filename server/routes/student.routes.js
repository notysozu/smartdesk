const express = require("express");
const router = express.Router();
const { protectStudent, rateLimit, securityHeaders } = require("../middleware/auth.middleware");
const studentController = require("../controllers/student.controller");

router.use(securityHeaders);
router.use(rateLimit);
router.use(protectStudent);
router.get("/student", studentController.dashboard);
router.post("/student/feedback", studentController.submitFeedback);
router.get("/api/student/top-topics", studentController.topTopicsJson);
router.get("/api/student/courses", studentController.getCourses);
router.get("/api/student/attendance", studentController.getAttendance);
router.get("/api/student/fees", studentController.getFees);
router.get("/api/student/library", studentController.getLibrary);
router.get("/api/student/events", studentController.getEvents);
router.get("/api/student/announcements", studentController.getAnnouncements);

module.exports = router;
