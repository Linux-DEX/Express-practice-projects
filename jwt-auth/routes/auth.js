const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashPassword });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "registration failed" });
  }
});

// user login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Authenticaton failed!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authenticaton failed!" });
    }

    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
