const fs = require("fs");
const path = require("path");

const EMAILS_FILE = path.join(__dirname, "../data/emails.json");

const readEmails = () => {
  if (!fs.existsSync(EMAILS_FILE)) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(EMAILS_FILE, "utf-8");
  return JSON.parse(data);
};

const writeEmails = (emails) => {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.subscribe = (req, res) => {
  try {
    const email = req.body.EMAIL?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const emails = readEmails();

    if (emails.includes(email)) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    emails.push(email);
    writeEmails(emails);

    return res.status(201).json({ message: "Successfully subscribed" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
