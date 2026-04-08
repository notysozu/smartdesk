const express = require("express");
const router = express.Router();
const { rateLimit, securityHeaders, optionalAuth, protect } = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");

router.use(securityHeaders);
router.post("/login", rateLimit, authController.login);
router.get("/logout", optionalAuth, authController.logout);
router.post("/logout", optionalAuth, authController.logout);
router.get("/api/auth/me", protect(), authController.getMe);
router.post("/api/auth/change-password", protect(), authController.changePassword);
router.post("/api/auth/refresh", authController.refreshToken);

module.exports = router;
