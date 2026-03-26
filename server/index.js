require("dotenv").config();
const { app } = require("./app");
const connectDB = require("./data/db");

// Boot
const PORT = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 SmartDesk API running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err.message);
    process.exit(1);
  });
