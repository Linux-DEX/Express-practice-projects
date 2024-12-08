const express = require("express");
const router = express();

const verifyToken = require("../middleware/authMiddleware");

// protected route
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = router;
