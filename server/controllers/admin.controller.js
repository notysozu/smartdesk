const Topic = require("../data/topic.model");
const User = require("../models/User");

const CATEGORIES = [
  "Academics",
  "Faculty",
  "Infrastructure",
  "Hostel",
  "Administration",
  "Other",
];

async function buildAnalytics(matchFilter, selected) {
  /* 1. Total submissions (respecting category filter if applied) */
  const totalSubmissions = await Topic.countDocuments(matchFilter);

  /* 2. Top topics by votes */
  const topTopics = await Topic.find(matchFilter)
    .sort({ votes: -1 })
    .limit(5);

  /* 3. Category distribution (within current filter scope) */
  const categoryPipeline = [];
  if (Object.keys(matchFilter).length) {
    categoryPipeline.push({ $match: matchFilter });
  }
  categoryPipeline.push({
    $group: {
      _id: "$category",
      count: { $sum: 1 },
    },
  });

  const categoryDistribution = await Topic.aggregate(categoryPipeline);

  /* 4. Weekly trend (last 7 days, respecting category filter) */
  const now = new Date();
  const sevenDaysAgo = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 6
  );

  const weeklyMatch = {
    createdAt: { $gte: sevenDaysAgo },
    ...matchFilter,
  };

  const weeklyTrends = await Topic.aggregate([
    { $match: weeklyMatch },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);

  return {
    totalSubmissions,
    topTopics,
    categoryDistribution,
    weeklyTrends,
    selectedCategory: selected,
  };
}

exports.dashboard = async (req, res) => {
  // Legacy EJS dashboard removed. Keep route for backward compatibility by returning JSON.
  return exports.analyticsJson(req, res);
};

exports.analyticsJson = async (req, res) => {
  try {
    const selected =
      typeof req.query.category === "string" &&
      CATEGORIES.includes(req.query.category)
        ? req.query.category
        : "All";

    const matchFilter =
      selected === "All" ? {} : { category: selected };

    const analytics = await buildAnalytics(matchFilter, selected);

    res.json(analytics);
  } catch (err) {
    console.error("Analytics JSON error:", err);
    res.status(500).json({ error: "Failed to load analytics" });
  }
};

// User Management
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      const bcrypt = require("bcryptjs");
      updates.password = await bcrypt.hash(updates.password, 12);
    }
    await User.findByIdAndUpdate(id, updates);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Topic Management
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json({ message: "Topic created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await Topic.findByIdAndUpdate(id, req.body);
    res.json({ message: "Topic updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
