const express = require("express");
const router = express.Router();
const { loginLimiter } = require("../middleware/rateLimit.middleware");
const authController = require("../controllers/auth.controller");

router.post("/login", loginLimiter, authController.login);
router.post("/logout", authController.logout);

module.exports = router;
