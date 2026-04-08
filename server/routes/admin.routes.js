const express = require("express");
const router = express.Router();
const { protectAdmin, rateLimit, securityHeaders } = require("../middleware/auth.middleware");
const adminController = require("../controllers/admin.controller");
const insightsController = require("../controllers/insights.controller");

router.use(securityHeaders);
router.use(rateLimit);
router.use(protectAdmin);
router.get("/api/admin/analytics", adminController.analyticsJson);
router.get("/api/admin/stats", adminController.getDashboardStats);
router.get("/api/admin/insights", insightsController.getInsights);

module.exports = router;
