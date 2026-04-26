const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  // Generate JWT token like in login
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ 
    token,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email 
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.json({ message: "No token" });

  const token = header.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;
  next();
};

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected Data", user: req.user });
});

module.exports = router;
