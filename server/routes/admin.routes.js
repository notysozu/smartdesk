const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const adminController = require("../controllers/admin.controller");
const insightsController = require("../controllers/insights.controller");

router.get("/admin", protect("admin"), adminController.dashboard);
router.get(
  "/api/admin/analytics",
  protect("admin"),
  adminController.analyticsJson
);

router.get(
  "/api/admin/insights",
  protect("admin"),
  insightsController.insightsJson
);

// User management
router.get("/api/admin/users", protect("admin"), adminController.getUsers);
router.post("/api/admin/users", protect("admin"), adminController.createUser);
router.put("/api/admin/users/:id", protect("admin"), adminController.updateUser);
router.delete("/api/admin/users/:id", protect("admin"), adminController.deleteUser);

// Topic management
router.get("/api/admin/topics", protect("admin"), adminController.getTopics);
router.post("/api/admin/topics", protect("admin"), adminController.createTopic);
router.put("/api/admin/topics/:id", protect("admin"), adminController.updateTopic);
router.delete("/api/admin/topics/:id", protect("admin"), adminController.deleteTopic);

module.exports = router;
