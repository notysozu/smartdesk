const { app } = require("../server/app");
const connectDB = require("../server/data/db");

module.exports = async (req, res) => {
  if (req.url === "/health" || req.url.startsWith("/health?")) {
    return app(req, res);
  }

  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection unavailable:", err.message);
    return res.status(503).json({ error: "Database unavailable" });
  }

  return app(req, res);
};
