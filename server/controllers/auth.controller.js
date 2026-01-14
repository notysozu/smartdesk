const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    console.log("Login request received", { 
      path: req.path, 
      method: req.method,
      accept: req.headers.accept,
      body: req.body 
    });
    const { identifier, password } = req.body;

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
      isActive: true
    });

    if (!user || !(await user.comparePassword(password))) {
      console.log("Login failed: Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
    });

    // If the client expects JSON
    const accept = String(req.headers.accept || "");
    console.log("Accept header:", accept, "Includes JSON:", accept.includes("application/json"));
    if (accept.includes("application/json") || req.path.startsWith("/api")) {
      console.log("Returning JSON response");
      return res.json({ ok: true, role: user.role, username: user.username });
    }

    console.log("Redirecting to:", `/${user.role}`);
    res.redirect(`/${user.role}`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};;

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
