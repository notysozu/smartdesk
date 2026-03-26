const mongoose = require("mongoose");

let connectionPromise;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (connectionPromise) {
      return connectionPromise;
    }

    mongoose.set("strictQuery", true);

    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000
    });

    await connectionPromise;
    console.log("✅ MongoDB connected");
    return mongoose.connection;

  } catch (err) {
    connectionPromise = null;
    throw err;
  }
};

module.exports = connectDB;
