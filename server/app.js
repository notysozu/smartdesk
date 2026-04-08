require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const securityMiddleware = require("./middleware/security.middleware");
const errorHandler = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const topicRoutes = require("./routes/topic.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const featuresRoutes = require("./routes/features.routes");
const roleRoutes = require("./routes/role.routes");
const configRoutes = require("./routes/config.routes");

function getAllowedOrigins() {
  const raw = process.env.CLIENT_ORIGIN || "http://localhost:3000";
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getHealthStatus() {
  return { ok: true, timestamp: new Date().toISOString() };
}

function corsForClient(req, res, next) {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
  }

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(corsForClient);
app.use(securityMiddleware);
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => res.json(getHealthStatus()));

app.get(
  "/api/announcements",
  require("./controllers/features.controller").getAllAnnouncements
);

app.use(authRoutes);
app.use(studentRoutes);
app.use(adminRoutes);
app.use(userRoutes);
app.use(topicRoutes);
app.use(newsletterRoutes);
app.use(featuresRoutes);
app.use(roleRoutes);
app.use(configRoutes);

app.use(errorHandler);

module.exports = { app, getAllowedOrigins, getHealthStatus };
